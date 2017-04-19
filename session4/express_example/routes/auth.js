var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser( function(user, done) {
    done(null, user);
});

passport.deserializeUser( function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
        // https://developers.facebook.com에서 appID및 secretID 발급
        clientID:"806275536219579",
        clientSecret:"752580b1fb1bc3811f862967edabf74d",
        callbackURL:"http://localhost:3000/auth/facebook/callback",
        profileFields:['id', 'displayName', 'photos', 'email']  // 받고싶은 필드 나열
    }, function(accessToken, refreshToken, profile, done) {
        // console.log(profile);
        // console.log(profile.displayName);
        // console.log(profile.emails[0].value);
        // console.log(profile._raw);
        // console.log(profile._json);

        UserModel.findOne( {username: profile._json.email },
            function(err, user) {
                if(!user) { // 없으면 회원가입 후 로그인 성공 페이지 이동
                    var regData = { // DB에 등록 및 세션에 등록될 데이터
                        username: profile._json.email,
                        password: "facebook_login"
                    };

                    var User = new UserModel(regData);
                    User.save(function(err) {   // DB 저장
                        done(null, regData);    // 세션 등록
                    });
                } else { // 있으면 DB에서 가저와서 세션등록
                    done(null, user);
                }
            })
    }
));

router.get('/', function(req, res) {
    res.send("auth");
});

router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}) );

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/auth/facebook/success',
    failureRedirect: '/auth/facebook/fail' }
));

// 로그인 성공시 이동할 주소
router.get('/facebook/success', function(req, res) {
    res.send(req.user);
});

router.get('/facebook/fail', function(req, res) {
    res.send('facebook login fail');
});
module.exports = router;