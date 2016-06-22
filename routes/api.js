var express = require('express');
var router = express.Router();
var fs = require('fs');
var rootpath = require('app-root-path');
var photoLib = require('../modules/photolib');

function shuffleArray(d) {
  for (var c = d.length - 1; c > 0; c--) {
    var b = Math.floor(Math.random() * (c + 1));
    var a = d[c];
    d[c] = d[b];
    d[b] = a;
  }
  return d
};



router.get('/photos/:folder', function(req,res,next){
  var folder = req.params.folder;
    photoLib.getPhotos(folder, (e,photos)=>{
    if(!e){
      res.json(photos);    
    }
    else{
        console.log(e);
        res.status(e.status).json(e);
    }
  });
  res.json(photos);

});


router.get('/photos', function(req,res,next){
  var folder = req.params.folder;
  photoLib.getPhotos('all', (e,photos)=>{
    if(!e){
      var t =  photoLib.shuffle(photos)
      res.json(t);    
    }
     else{
        console.log(e);
        res.status(e.status).json(e);
    }
  });
  
});

router.get('/init', function(req,res,next){  
  var photos = photoLib.initialize();
  res.status(200);
  res.end('OK')
});




router.get('/folders', function(req,res,next){
  var folders = photoLib.getFolders(); 
  res.json(folders);

});
module.exports = router;
