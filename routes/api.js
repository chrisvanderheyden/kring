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


router.get('/api/photos/', function(req,res,next){


});