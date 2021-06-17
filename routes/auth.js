const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const auth = {};
const config = require('config');
const auth_middleware = require('../middleware/auth');

auth.auth = async (req, res) => {
    const { email, password } = req.body;

    //simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //checking for existing user
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'User does not exist!!' });
            } else {
                //Validating password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({ msg: "invalid credentials" })
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
            }
        })
}

auth.getCurrentUser = async(req,res) =>{
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
}

module.exports = auth;