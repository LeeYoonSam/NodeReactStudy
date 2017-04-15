var express = require('express');
var router = express.Router();
var ContactModel = require('../models/ContactModel');

router.get('/', function (req, res) {
    // res.send("contact test");
    res.render('contacts/list');
});

module.exports = router;