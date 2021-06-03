const Article = require('../models/articleModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userController = {};

userController.signup = async (req, res) => {
    const newAcccount = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        articles: req.body.articles,
    })

    jwt.sign({ newAcccount }, 'secretKey', (err, token) => {
        //console.log(token)
        let userInfo = {
            user: newAcccount,
            token: token
        }
        res.json(userInfo)
    })
    //console.log(newAcccount);
    newAcccount.save();
}

userController.login = async (req, res) => {
    console.log(req.body)
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(200).send({user: user});
        }
    })
}

userController.saveArticle = async (req, res) => {
    console.log(getUserById(req,res))
    
}

userController.getAllUsers = async (req, res) => {
    User.find({}, function (err, users) {
        if (users) {
            res.json(users)
        }

        if (err) {
            res.json(err)
        }
    })
}

userController.getUserById = async (req, res) => {
    console.log(req.params)
    User.findOne({ _id:{ $in: mongoose.Types.ObjectId( req.params.id)} }, function (err, user) {
        if (user) {
            res.json(user)
        }

        if (err) {
            res.json(err)
        }
    })
}

userController.getUserByUsername = async (req, res) => {
    console.log(req.params.username)
    User.find({ username:req.params.username}, function (err, user) {
        if (user) {
            res.send(user)
        }

        if (err) {
            res.json(err)
        }
    })
}


module.exports = userController;