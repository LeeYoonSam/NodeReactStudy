// Router 를 생성.

var express = require('express');
var router = express.Router();

// router.get('/', function(req, res){
//     res.send('posts app');
// });

// 템플릿(views 폴더) 지정 render()사용
router.get('/', function(req, res){
    res.render('posts/list');
});

router.get('/write', function(req, res) {
    res.send('posts write');
});

module.exports = router;