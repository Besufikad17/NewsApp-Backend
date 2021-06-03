const Article = require('../models/articleModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const articleController = {};

articleController.getAllArticles = async(req, res) => {
    Article.find({}, function (err, articles) {
        if (articles) {
            res.json(articles)
        }

        if (err) {
            res.json(err)
        }
    })
}

articleController.getArticleById = async(req, res) => {
    Article.find({_id:{ $in: mongoose.Types.ObjectId( req.params.id)}}, function (err, article) {
        if (article) {
            res.json(article)
        }

        if (err) {
            res.json(err)
        }
    })
}

articleController.getArticleByTitle = async(req, res) => {
    Article.find({title:req.params.title}, function (err, article) {
        if (article) {
            res.json(article)
        }

        if (err) {
            res.json(err)
        }
    })
}

articleController.addArticle = async(req, res) => {

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

articleController.reportArticle = async(res, req) => {
    let report = {
        _id: req.body.id,
        report_tag: req.body.report_tag
    }
    console.log(report)
    Article.updateOne({ _id: report.id }, { reportTag: report.report_tag }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("sucessfully updated");
        }
    })
}

articleController.voteArticle = async(res,req) => {
    let obj = Article.findOne({_id: req.body.id})
    Article.updateOne({ _id: vote.id }, { upvote: (obj.upvote + 1) }, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("sucessfully updated");
        }
    })

}


module.exports = articleController;