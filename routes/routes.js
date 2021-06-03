const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const articleController = require('../controller/articleController');

//user end points
router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.put('/save', userController.saveArticle);

router.get('/users', userController.getAllUsers);

router.get('/user/id/:id', userController.getUserById);

router.get('/user/:username', userController.getUserByUsername);

//article end points
router.post('/article/add', articleController.addArticle);

router.get('/articles', articleController.getAllArticles);

router.get(`/article/:id`, articleController.getArticleById);

router.get(`/article/title/:title`, articleController.getArticleByTitle);

module.exports = router;
