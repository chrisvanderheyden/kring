var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
    iss : String,
    sub : String,
    data : Mixed     
});


var userSchema = new Schema({
    name : String, 
    email : String, 
    roles : [String],
    login : [loginSchema] ,
    data : Mixed,     
}
,{collection : 'users'});

module.exports = mongoose.model('User', userSchema);
