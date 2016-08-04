var express = require('express');
var ejs = require('ejs');

var router = express.Router();
var fs = require('fs');
var rootpath = require('app-root-path');
var photoLib = require('../modules/photolib');



/* GET home page. */
router.get(['/', '/home', '/index.html'] , function(req, res, next){
  res.render('index', {title: ' - Welkom', user: req.user} );      
});

/* GET home page. */
router.get(['/voorwoord'] , function(req, res, next){
  res.render('voorwoord', {title: ' - voorwoord', user: req.user} );      
});
/* GET home page. */
router.get(['/gallerij', ] , function(req, res, next){
  res.render('gallery', {title: ' - de kring', user: req.user} );      
});


/* GET home page. */
router.get(['/deelnemen', ] , function(req, res, next){
  res.render('deelnemen', {title: ' - deelnemen', user: req.user} );      
});




/* GET home page. */
router.get('/gallerij/:folder', function(req, res, next) {
  var randomness = 5;
  var folder = req.params.folder;
  res.para
  if(req.query.r !== undefined)
     randomness = req.query.r;
  photoLib.getPhotos(folder, (e,photos)=>{

      if(!e){
        var images = photoLib.shuffle(photos);
        res.render('gallery', {randomness: randomness, title: 'Dekring' + folder, images : images, error: null });
      }
      else{
        res.render('gallery', {randomness: randomness, title: 'Dekring' + folder, error: e.message });
      }
  });
});


module.exports = router;
