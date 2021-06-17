const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const articleController = require('../controller/articleController');
const auth = require('./auth');
const auth_middleware = require('../middleware/auth');

//user end points
router.post('/signup', userController.signup);

router.post('/auth', auth.auth);

router.get('/user', auth_middleware, auth.getCurrentUser);

router.post('/login', userController.login);

router.put('/save',auth_middleware, userController.saveArticle);

router.put('/remove',auth_middleware, userController.removeArticle);

router.get('/users', userController.getAllUsers);

router.get('/user/id/:id',  userController.getUserById);

router.get('/user/:username',  userController.getUserByUsername);

//article end points
router.post('/article/add',auth_middleware, articleController.addArticle);

router.get('/articles', articleController.getAllArticles);

router.get(`/article/:id`, articleController.getArticleById);

router.get(`/article/title/:title`, articleController.getArticleByTitle);

router.put('/article/report', articleController.reportArticle);

router.put('/article/upvote', auth_middleware, articleController.upvoteArticle);

router.put('/article/downvote', auth_middleware,articleController.downvoteArticle);

router.delete('/article/delete', auth_middleware, articleController.deleteArticle);

module.exports = router;
