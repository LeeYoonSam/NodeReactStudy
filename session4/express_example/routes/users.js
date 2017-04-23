var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

/* GET users listing. */

// GET /users 사용자 리스트 출력
router.get('/', function(req, res, next) {
	UserModel.find({}, function(err, users) {
		res.render('users/list', { users: users });	
	});
});

// GET /users/:id 각 사용자의 상세화면
router.get('/:id', function(req, res, next) {
  	UserModel.findOne({ id: req.params.id }, function(err, user) {
		res.render('users/detail', { user: user });	
	});	
});


module.exports = router;
