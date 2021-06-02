const express = require('express');
const datas = [];
const app = express();
var multer = require('multer');
var fs = require('fs');
const path = require('path');

app.use((req,res,next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers','Content-Type');
    next();
})

function noCacheMiddleware() {
    return(req,res,next) => {
        res.setHeader('Cache-Control','public,no-store,no-cache,must-revalidate');
        res.setHeader('Expires','-1');
        res.setHeader('Pragma', 'no-cache');
        next();
    }
}

app.use(express.json());
app.get('/api/articles',  noCacheMiddleware(),(req, res) => {
    res.json(datas);
})

app.post('/add', (req,res) => {
    const newMember = {
        news_id: req.body.news_id,
        news_header: req.body.news_header,
        news_content: req.body.news_content,
        uploader: req.body.uploader,
        images: req.body.images,
        date: req.body.date,
        view: req.body.view
    }
    datas.push(newMember);
    res.json(datas);
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file');

app.get('/images', (req, res) => {
   let uploadDirectory = path.join('./public/uploads');
   fs.readdir(uploadDirectory, (err, files) => {
       if(files.length == 0){
           console.log('No Images Uploaded')
       }
       return res.json({files});
   })
})


app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});


app.listen(5000);