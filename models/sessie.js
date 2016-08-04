var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessieSchema = new Schema({
    datum : Date,
    begin : Date,
    einde : Date,
    label : String

});
