var express = require('express');
var index = require('./../app/routes/index');
var home = require('./../app/routes/home');
var employeePage = require('./../app/routes/employee');
var companyPage = require('./../app/routes/company');
var hrPage = require('./../app/routes/hr');
var adminPage = require('./../app/routes/admin');
//var styles = require('./static/css/styles.css');


module.exports = function (app) {
    app.use('/', index);

    app.use('/home', home);


    // app.use('/ttt',styles );

    app.use('/static', express.static('../app/static'));

    // app.get('/', function (req, res) {
    //     if (req.session.userID) {
    //         res.render('index', {
    //             username: req.session.username,
    //             msg: req.session.msg
    //         });
    //     } else {
    //         req.session.msg = 'Access denied!';
    //         res.redirect('/login');
    //     }
    // });
    
    app.get('/star', function (req, res) {
        if (req.session.userID !==null && req.session.userID) {
            switch(req.session.page) {
                case "employee":
                    app.use('/home', employeePage);
                    break;
                 case "company":
                    app.use('/home', companyPage);
                    break;
                 case "hr":
                    app.use('/home', hrPage);
                    break;
                 case "admin":
                    app.use('/home', adminPage);
                    break;
                default:
                    res.render('start', {
                        username: req.session.username,
                        msg: req.session.msg
                    });
            }

        } else {
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    });

    app.get('/user', function (req, res) {
        if (req.session.userID) {
            res.render('user', {msg: req.session.msg});
        } else {
            req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    });

    app.get('/signupEmp', function (req, res) {
        req.session.page = "employee";
        res.render('signup', {msg: req.session.msg, page:"Emp"});
    });
    app.get('/signupCompany', function (req, res) {
        req.session.page = "Company";
        res.render('signup', {msg: req.session.msg, page:"Company"});
    });
    app.get('/signupHR', function (req, res) {
        req.session.page = "HR";
        res.render('signup', {msg: req.session.msg, page:"HR"});
    });
    app.get('/signupAdmin', function (req, res) {
        req.session.page = "Admin";
        res.render('signup', {msg: req.session.msg, page:"Admin"});
    });
    app.get('/signup', function (req, res) {
        req.session.page = "";
        res.render('signup', {msg: "DEPRECATED", page:""});
    });

    app.get('/loginEmp', function (req, res) {
        req.session.page="employee";
        res.render('login', {msg: req.session.msg, page:"Emp1"});
    });
    app.get('/loginCompany', function (req, res) {
        req.session.page = "Company";
            res.render('login', {msg: req.session.msg, page:"Company"});
        });
    app.get('/loginHR', function (req, res) {
        req.session.page = "HR";
        res.render('login', {msg: req.session.msg, page:"HR"});
    });
    app.get('/loginAdmin', function (req, res) {
        req.session.page = "Admin";
        res.render('login', {msg: req.session.msg, page:"Admin"});
    });

    app.get('/login', function (req, res) {
            req.session.page = "";
            res.render('login', {msg: "DEPRECATED", page:"" });
        });

    app.get('/logout', function (req, res) {
        req.session.destroy(function () {
            res.redirect('/login');
        });
    });

    var users = require('./../app/controllers/users_controller');
    app.post('/signup', users.signup);
    app.post('/user/update', users.updateUser);
    app.post('/user/delete', users.deleteUser);
    app.post('/loginEmp', users.login);
    app.post('/loginCompany', users.login);
    app.post('/loginHR', users.login);
    app.post('/loginAdmin', users.login);
    app.post('/login', users.login);
    app.get('/user/profile', users.getUserProfile);
};