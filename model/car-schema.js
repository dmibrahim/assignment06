const mongoose = require('mongoose');
const dealerschema = require('./dealer-schema');
const imageschema = require('./image-schema');


let carschema = new mongoose.Schema({
vin: {type: String, required:true},
make:{type:String, required:true},
model:{type:String, required: true},
type:{type:String, required: true},
year:{type:String, required:true},
exteriorColor:{type:String, required:true},
interiorColor:{type:String, required:true},
sellingPrice:{type:Number, required:true},
images:[imageschema],
dealer:dealerschema,
status:{type:String, required:true,default:'Available'},
})

module.exports = mongoose.model("Car",carschema);