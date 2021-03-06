/**
 * Created by rlaron on 3/24/2017.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var userName = "";
    if (req.session.userID !==null && req.session.userID) {
        userName = req.session.username;
    } else {
        req.session.msg = 'user not authenticated!';
    }

    res.render('home',
        { title: 'GreenLight - Employee page',
            username: userName,
            contentType: "employee",
            msg: req.session.msg });
});

module.exports = router;