const mongoose = require('mongoose');

const dealerschema = new mongoose.Schema({
  dealerId:{type:String, required:true},
  dealerName:{type:String, required:true},
  dealerAddress:{},
  phone:{type:String, required:true}

})

module.exports = dealerschema;