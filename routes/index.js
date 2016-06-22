var express = require('express');
var router = express.Router();
var fs = require('fs');
var rootpath = require('app-root-path');
var photoLib = require('../modules/photolib');


/* GET home page. */
router.get('/', function(req, res, next){
  var randomness = -1;
  var folder = 'all';
  res.para
  if(req.query.r !== undefined)
     randomness = req.query.r;
  photoLib.getPhotos(folder, (e,photos)=>{   
         
      if(!e){
        var images = photoLib.shuffle(photos);
        res.render('gallery', {randomness: randomness, title: 'Dekring' , images : images, error: null });   
      }
      else{
        res.render('gallery', {randomness: randomness, title: 'Dekring' , error: e.message });
      } 
  });    
});


/* GET home page. */
router.get('/gallerij/:folder', function(req, res, next) {
  var randomness = -1;
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
