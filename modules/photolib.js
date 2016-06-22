var fs = require('fs');
var photoRootPath = '';  
var baseUri ='/images/fotos/'
var basePath = '/public/images/fotos/'


function Photolib(options){
  if(options!==undefined)
    photoRootPath = options.rootPath || require('app-root-path') + basePath;  
  else
    photoRootPath = require('app-root-path') + basePath;
   this.folders = null;
   this.photos = null;
   
   this.initialize();
   
}

Photolib.prototype.shuffle = function(a){
  return a.slice(0).sort((a,b)=>{
      if(a.date > b.date)
        return -1;
      else if( a.date < b.date)
        return 1;
      else
        return Math.random() > .5 ? -1 : 1;
        
      
  });
}

Photolib.prototype.initialize = function(){
    var f = this.loadFolders();
    var p = {};       
    this.folders = f;    
    f.forEach( (ff) =>{
      p[ff.folder]  = this.loadPhotos(ff.folder);
    });
    this.photos = p;
    this.all = this.getAll(); 
}
  

Photolib.prototype.loadFolders =  function() {
  var path = photoRootPath;
  var all = fs.readdirSync(path);
  var filtered  = [];
  all.forEach((item)=>{
    if(item.indexOf('.') < 0 )
    {
      if(fs.lstatSync(path + '/' + item).isDirectory())
        { 
          var d = new Date(Date.parse(item));
          filtered.push({folder : item, date: d, photos: '/api/photos/' + item });
        }
    }
  });
  
  return filtered;  
}

Photolib.prototype.getPhotos =  function(folder, cb) {
  
  if(folder === "all")
    return cb(null,this.all);  
  else if(this.photos[folder] !== undefined)
    return cb(null,this.photos[folder]);
  else 
    return cb( { status : 404, message : `photo folder ${folder} not found`  }, null);    
}


Photolib.prototype.loadPhotos =  function(folder) {
  var path = photoRootPath + folder; 
  var d = new Date(Date.parse(folder));
  var all = fs.readdirSync(path);
  var filtered  = [];
  all.forEach((item)=>{
    if(item.indexOf('.jpg') > 0 )      
          filtered.push({file : item, src: baseUri+ folder + '/' + item , folder: folder, date: d});  
  });
  
  return filtered;  
}

Photolib.prototype.getFolders =  function() {
    return this.folders;
}

Photolib.prototype.getAll =  function() {
  var p = new Array();
  for(var k in this.photos)
    p = p.concat(this.photos[k]);
  return p;  
}

exports = Photolib;
module.exports = new Photolib();