var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var loginRequired = require('../libs/loginRequired');

router.get('/', loginRequired, function(req, res) {

	UserModel.findOne( { id: req.user.id }, function(err, user) {
		res.render('profile/profile', {user: user});
	});
	
});

router.get('/edit', loginRequired, function(req, res) {
	UserModel.findOne( { id: req.user.id }, function(err, user) {
		res.render('profile/profile_edit', {user: user});
	});
	
});

router.post('/edit', loginRequired, function(req, res) {

	console.log(req.user.id);

	UserModel.findOne( { id: req.user.id }, function(err, user) {

		console.log(user);

		var query = {
			displayname: req.body.username,
			phone: req.body.phone
		};
		console.log(query);

		var user = new UserModel(query);
        UserModel.update(
            {id: req.user.id},
            { $set: query }, function(err) {
                res.redirect('/profile');
        });
        
	});
	
});

module.exports = router;