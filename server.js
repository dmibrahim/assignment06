const express = require('express');
const route = require('./route/routes');
require('./common/db-connection')
require('dotenv').config();
const app = express();
const multer =require('multer');

app.use(function(req, res, next) {
    console.log(req.path+' '+req.url+' '+req.baseUrl);
    next();
});

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/api/cars',route);


app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening at port ${process.env.SERVER_PORT}`)
})