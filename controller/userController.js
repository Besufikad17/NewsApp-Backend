const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const userController = {};
const config = require('config');


userController.signup = async (req, res) => {
    const { username, email, password } = req.body;

    //simple validation
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //checking for existing user
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: 'User already exists!!' });
            } else {
                const newAcccount = new User({
                    username,
                    email,
                    password
                })

                //create salt and hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAcccount.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAcccount.password = hash;
                        newAcccount.save().
                            then(user => {
                                jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email
                                        }
                                    })
                                })
                            })
                    })
                })
            }
        })
}

userController.login = async (req, res) => {
    console.log(req.body)
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }).exec((err, user) => {
        if (err) {
            res.status(400).send({ message: err });
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            jwt.sign({ user }, 'secretKey', (err, token) => {
                //console.log(token)
                let userInfo = {
                    user: user,
                    token: token
                }
                res.json(userInfo)
            })
        }
    })
}

userController.saveArticle = async (req, res) => {
    const {id, article_id} = req.body;
    User.updateOne({_id: id}, {$push: {articles: article_id}}, function(obj, err){
        if(err) return res.json({err})
        return res.json(obj)
    })
}

userController.removeArticle = async (req,res) => {
    const {id, article_id} = req.body;
    User.updateOne({_id: id}, {$pull: {articles: article_id}}, function(obj, err){
        if(err) return res.json({err})
        return res.json(User.findById(id))
    })
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
    User.findOne({ _id: { $in: mongoose.Types.ObjectId(req.params.id) } }, function (err, user) {
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
    User.find({ username: req.params.username }, function (err, user) {
        if (user) {
            res.send(user)
        }

        if (err) {
            res.json(err)
        }
    })
}


module.exports = userController;