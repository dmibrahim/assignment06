const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.catch(error => {
  //This will handle initial connection errors  
  console.log('----Errors in initializing mongo db connection, see details below:-----')
  console.log(error);
});
const db =  mongoose.connection;

db.on('error',(error) => {
//This will handle after initial connection has been established
 console.log('---Error connecting to mongodb-----')
 console.log(error)
});
// When the connection is disconnected
 db.on('disconnected', function () {
    console.log('Mongoose default connection to DB :' + process.env.DB_URL + ' disconnected');
  });
  var gracefulExit = function() { 
   db.close(function () {
      console.log('Mongoose default connection with DB :' + process.env.DB_URL + ' is disconnected through app termination');
      process.exit(0);
    });
  }
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit); 


