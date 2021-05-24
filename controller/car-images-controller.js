const {Car,Image} = require('../model/index');
const fs = require('fs');
const path =require('path');

const carImageController = {
addcarImage (req,res) {

    const carid = req.params.carid;
   let img = new Image();

   let imgBuffer =  fs.readFileSync(path.join(req.file.destination,req.file.filename));
    let base64 = imgBuffer.toString('base64');
    if(req.file){       
        if(req.body.imagename)
           img.imagename = req.body.imagename;
         if(req.body.imagedesc){
           img.imagedesc = req.body.imagedesc; 
         }
           img.img =  {
             data: imgBuffer,
             contentType: req.file.mimetype
         }

         fs.unlink(path.join(req.file.destination,req.file.filename), function(err) {
            if (err) {
              console.log(err);
            } 
          })
    }
    else{
        res.status(205).json({msg: 'Please upload an image'})
    }

    Car.findById(carid).exec( (error, data)=> {
        if(error){
            console.log(error);
            if(error.name=='ValidationError'){
                 let errors = {};
                 Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                 })
                 res.status(402).json({msg:errors}); 
            }
            else{
                 res.status(500).json({msg:'internal server error '});
            }
       }
       else{
           data.images.push(img);
           Car.updateOne({_id:carid},data).exec( (error, data)=> {
            if(error){
                console.log('------Error Adding Image to car-----');
                console.log(error);
                res.status(500).json({msg: 'error adding image to car'});
           }     
           else{
                res.status(203).json({msg: `car with id ${carid} was updated with mew image!`});
           }
           })
           
        }
    })
}


}

module.exports = carImageController