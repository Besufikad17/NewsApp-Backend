const Article = require('../models/articleModel');
const User = require('../models/userModel');
const userAction = require('../models/userActionsModel');
const mongoose = require('mongoose');
const articleController = {};

articleController.getAllArticles = async (req, res) => {
    Article.find({}, function (err, articles) {
        if (articles) {
            res.json(articles)
        }

        if (err) {
            res.json(err)
        }
    })
}

articleController.getArticleById = async (req, res) => {
    Article.find({ _id: { $in: mongoose.Types.ObjectId(req.params.id) } }, function (err, article) {
        if (article) {
            res.json(article)
        }

        if (err) {
            res.json(err)
        }
    })
}

articleController.getArticleByTitle = async (req, res) => {
    Article.find({ title: req.params.title }, function (err, article) {
        if (article) {
            res.json(article)
        }

        if (err) {
            res.json(err)
        }
    })
}

articleController.addArticle = async (req, res) => {

    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        view: 0,
        coverImage: req.body.coverImage
    })
    res.json(article)
    article.save();
}

articleController.reportArticle = async (req, res) => {
    const { id, report_tag } = req.body;
    Article.updateOne({ _id: id, report_tag: report_tag }, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.json({ msg: "sucessfuly reported" })
        }
    })
}

articleController.upvoteArticle = (req, res) => {
    const { id, username } = req.body;
    //checking if the user action exists 
    userAction.findOne({ username, action_type: "upvote" })
        .then(ob => {
            if (ob) {
                return res.status(400).json({ msg: 'Article is already upvoted!!' });
            } else {
                //Getting score
                Article.findOne({ _id: id })
                    .then(obj => { //Adding action to user_actions
                        const user_action = new userAction({
                            username,
                            action_type: "upvote",
                            object_id: id
                        })
                        obj.update({ $inc: { score: 1 } }, function (err) {
                            if (err) {
                                return res.json({err})
                            } else {
                                user_action.save();
                                return res.status(200).json({ article: obj })
                            }
                        })
                    })
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

articleController.downvoteArticle = async (req, res) => {
    const { id, username } = req.body;
    // checking if the user action exists 
    userAction.findOne({ username, action_type: "downvote" })
        .then(ob => {
            if (ob) {
                return res.status(400).json({ msg: 'Article is already downvoted!!' });
            } else {
                Article.findOne({ _id: id })
                    .then(obj => {
                         //Adding action to user_actions
                        const user_action = new userAction({
                            username,
                            action_type: "downvote",
                            object_id: id
                        })
                        obj.update({ $inc: { score: -1 } }, function (err) {
                            if (err) {
                                return res.json({err})
                            } else {
                                user_action.save();
                                return res.status(200).json({ article: obj })
                            }
                        })
                    })
            }
        })
        .catch(err => {
            return res.status(400).json(err);
        })
}

articleController.deleteArticle = async (req, res) => {
    const { id } = req.body;
    Article.deleteOne({ _id: { $in: mongoose.Types.ObjectId(id) } }, function (obj,err) {
        if (err) return res.status(400).json(err)
        res.json(obj)
    })
}

module.exports = articleController;