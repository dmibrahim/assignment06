var mongoose = require('mongoose');
 
var imageSchema = new mongoose.Schema({
    imagename: String,
    imagedesc: String,
    img:
    {
        data:Buffer,
        contentType: String
    }
});

module.exports = imageSchema;