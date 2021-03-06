var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var passwordHash = require('../libs/passwordHash');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, 
    function (req, username, password, done) {
        UserModel.findOne({ username : username , password : passwordHash(password) }, function (err,user) {
            if (!user){
                return done(null, false, { message: '아이디 또는 비밀번호 오류 입니다.' });
            }else{
                return done(null, user );
            }
        });
    }
));

router.get('/', function(req, res){
    res.send('account app');
});

router.get('/join', function(req, res){
    res.render('accounts/join');
});

router.post('/join', function(req, res){
    var User = new UserModel({
        username : req.body.username,
        password : passwordHash(req.body.password),
        displayname : req.body.displayname
    });
    User.save(function(err){
        // res.send('<script>alert("회원가입 성공");location.href="/accounts/login";</script>');
        res.json({ message : "success" });
    });
});

router.get('/login', function(req, res){
    res.render('accounts/login', { flashMessage : req.flash().error });
});

// // ejs에서 사용하던 router
// router.post('/login' , 
//     passport.authenticate('local', { 
//         failureRedirect: '/accounts/login', 
//         failureFlash: true 
//     }), 
//     function(req, res){
//         res.send('<script>alert("로그인 성공");location.href="/posts";</script>');
//     }
// );

// passport Custom Callback
router.post('/login' , (req, res ,next) => {
    passport.authenticate('local', function(err, user, info){
        console.log(user);
        if(!user){
            return res.json({ message: info.message });
        }
        req.logIn(user, function(err) {
            return res.json({ message : "success" });
        });
    })(req, res, next);   
});

router.get('/success', function(req, res){
    res.send(req.user);
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/accounts/login');
});


router.get('/status', (req, res) => {
    res.json({ isLogin: req.isAuthenticated() });
});


module.exports = router;