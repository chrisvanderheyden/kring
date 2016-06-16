var express = require('express');
var router = express.Router();
var fs = require('fs');
var rootpath = require('app-root-path');

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};


/* GET home page. */
router.get('/', function(req, res, next) {

  var randomness = 5;
  if(req.query.r !== null)
    randomness = req.query.r;
    
  var dir = rootpath + '/public/images/fotos/';
  console.log(dir);

  fs.readdir(  dir, function(e,f){
    var img = [];
    var error = "";

    if(e===null){
      f.forEach(function(file){
        img.push( {src : '/images/fotos/' + file} );
      });
    }
    else{
      error = e;
    }

    res.render('index', {randomness: randomness, title: 'Express', images : shuffleArray(img), error: error });

  });
});

router.get('/gallerij2', function(req, res, next) {

  var dir = rootpath + '/public/images/fotos/';
  console.log(dir);

  fs.readdir(  dir, function(e,f){
    var img = [];
    var error = "";

    if(e===null){
      f.forEach(function(file){
        img.push( {src : '/images/fotos/' + file} );
      });
    }
    else{
      error = e;
    }

    res.render('index2', { title: 'Express', images : shuffleArray(img), error: error });

  });
});

module.exports = router;
