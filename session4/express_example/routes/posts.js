// Router 를 생성.

var express = require('express');
var router = express.Router();
var PostModel = require('../models/PostModel');
var CommentModel = require('../models/CommentModel');

var loginRequired = require('../libs/loginRequired');
var co = require('co');

// csrf 셋팅 (토큰을 생성해서 유효한지 체크 - 토큰이 파라미터로 넘오지않으면 에러 발생! (input type hidden으로 토큰을 생성))
 var csrf = require('csurf');
 var csrfProtection = csrf({ cookie: true });

 // === multer 이미지 업로드 ===
// 이미지 저장위치 설정
var path = require('path');
var uploadDir = path.join(__dirname, '../uploads');
var fs = require('fs');

// set multer
var multer = require('multer');
var storage = multer.diskStorage({
     destination : function (req, file, callback) {
         callback(null, uploadDir );
     },
     filename : function (req, file, callback) {
         callback(null, 'posts-' + Date.now() + '.'+ file.mimetype.split('/')[1] );
     }
 });

var upload = multer({ storage: storage });
// === multer 이미지 업로드 ===


// === POST 관련 ===
// 템플릿(views 폴더) 지정 render()사용
router.get('/', (req, res) => {
    PostModel.find( {}, function(err, posts) {
        res.render('posts/list', { posts: posts });
    });
});

router.get('/write', loginRequired, csrfProtection, function(req, res){
    res.render('posts/form' , { post : "" , csrfToken : req.csrfToken() });
});

// router.get('/write', function(req, res) {
//     res.render('posts/form', { post: "" });
// });

router.post('/write', loginRequired, upload.single('thumbnail'), csrfProtection, function(req, res) {

    console.log(req.file);

    var post = new PostModel({
        title : req.body.title,
        content : req.body.content,
        thumbnail: (req.file) ? req.file.filename : "",
        username: req.user.displayname
    });

    // validation 확인
    var validationError = post.validateSync();
    if(!validationError) {
        post.save(function(err){
            res.redirect('/posts');
        });    
    }

    // if(validationError) {
    //     res.send(validationError);
    // } else {
    //     post.save(function(err){
    //         res.redirect('/posts');
    //     });    
    // }
});

router.get('/detail/:id', loginRequired, csrfProtection, function(req, res) {
    // co 사용 - generator 적용 해봄
    var getPost = co(function* () {
        var post = yield PostModel.findOne( {'id': req.params.id} ).exec();
        var comments = yield CommentModel.find( {'post_id': req.params.id} ).exec();

        return {
            post: post,
            comments: comments
        };
    });

    getPost.then(result => {
        res.render('posts/detail',
        {
            post: result.post,
            comments: result.comments,
            csrfToken: req.csrfToken() 
        });
    });

    // PostModel.findOne( { id: req.params.id }, function(error, post) {
    //     // 코멘트 부분 같이 가져오기 위해 수정
    //     CommentModel.find( { post_id: req.params.id }, function(err, comments) {
    //         res.render('posts/detail', { post: post, comments: comments, csrfToken: req.csrfToken()});
    //     });

    //     // res.render('posts/detail', { post });
    // });
});

router.post( '/ajax_comment/insert', csrfProtection, function(req, res) {
    var comment = new CommentModel({
        content: req.body.content,
        post_id: parseInt(req.body.post_id)
    });

    comment.save(function(err, comment) {
        res.json({
            id: comment.id,
            content: comment.content,
            message: "success"
        });
    });
});

router.post( '/ajax_comment/delete', function(req, res) {
    CommentModel.remove({ id: req.body.comment_id }, function(err) {
        res.json({ message: "success"});
    });
});

router.get( '/edit/:id', loginRequired, csrfProtection, function(req, res) {
    PostModel.findOne({id:req.params.id}, function(error, post) {
        res.render('posts/form', { post: post, csrfToken: req.csrfToken() });
    });
    
});

router.post( '/edit/:id', loginRequired, upload.single('thumbnail'), csrfProtection, function(req, res) {
    // 이전 파일명을 먼저 받아온다.
    PostModel.findOne( {id: req.params.id}, function(err, post) {
        if(req.file) {
            fs.unlinkSync( uploadDir + '/' + post.thumbnail );
        }

        var query = {
            title: req.body.title,
            content: req.body.content,
            thumbnail: (req.file) ? req.file.filename : post.thumbnail,
            username: req.user.displayname
        };

        var post = new PostModel(query);
        if(!post.validateSync()) {
            PostModel.update(
                {id: req.params.id},
                { $set: query }, function(err) {
                    res.redirect('/posts/detail/' + req.params.id);
            });
        }
    });
});

router.get('/delete/:id', function(req, res) {
    PostModel.remove(
        { id: req.params.id }, 
        function(err) {
            res.redirect('/posts');
        }
    );
})


// === Comment 관련 ===


module.exports = router;