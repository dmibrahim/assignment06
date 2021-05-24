const {Car,Image} = require('../model/index');
const fs = require('fs');
const path =require('path');

const carcontroller = {
addNewCar( req,res){
 let car = new Car();

if(req.body && req.body.vin)
     car.vin= req.body.vin;

if(req.body && req.body.make)
     car.make= req.body.make;

if(req.body && req.body.model)
     car.model= req.body.model;

if(req.body && req.body.type)
     car.type = req.body.type;

if(req.body && req.body.year)
     car.year = req.body.year;

if(req.body && req.body.exteriorColor)
     car.exteriorColor = req.body.exteriorColor; 

if(req.body && req.body.interiorColor)
     car.interiorColor = req.body.interiorColor; 

if(req.body && req.body.sellingPrice)
     car.sellingPrice = req.body.sellingPrice; 

if(req.body && req.body.sellingPrice)
     car.sellingPrice = req.body.sellingPrice; 

if(req.file){
    let imgBuffer =  fs.readFileSync(path.join(req.file.destination,req.file.filename));
    let base64 = imgBuffer.toString('base64');
      console.log(base64);
      // Feed out string to a buffer and then put it in the database
      //let imageBuffer = Buffer.from(base64string, "base64");
     // car.images = base64;
     let img = new Image();
     if(req.body.imagename)
        img.imagename = req.body.imagename;
      if(req.body.imagedesc){
        img.imagedesc = req.body.imagedesc; 
      }
        img.img =  {
          data: imgBuffer,
          contentType: req.file.mimetype
      } 
      console.log(img);
      car.images.push(img);
}

console.log('Image',req.file) ;
console.log('car',car) ;
Car.create(car, (error,data)=> {
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
          res.status(200).json({msg:'Data saved '});
     }
})

   
},
getAllCars(req, res){

     Car.find((error,data)=> {
          if(error){
               console.log('------Error retrieving all cars-----');
               console.log(error);
               res.status(500).json({msg: 'error retrieving cars'})
          }
          else{
               if(data){
               let result = [];
               data.forEach(_car =>{
                    let carObj = {};
                    carObj._id = _car._id;
                    carObj.status = _car.status;
                    carObj.vin = _car.vin;
                    carObj.make = _car.make;
                    carObj.model = _car.model;
                    carObj.type = _car.type;
                    carObj.year = _car.year;
                    carObj.exteriorColor = _car.exteriorColor;
                    carObj.interiorColor = _car.interiorColor;
                    carObj.sellingPrice = _car.sellingPrice;
                    let carImages = [];
                    _car.images.forEach(img => {
                         let imageString =`data:${img.img.contentType};base64,${img.img.data.toString('base64')}`;
                         carImages.push(imageString);
                    })
                   carObj.images = carImages;
                    
                    result.push(carObj);
               })

               res.status(200).json({data: result});
               }
               else{
                    res.status(200).json({data: 'No data'});   
               }
          }
     })
}
,
getOneCarById(req, res){

     let carid = req.params.carid;

     Car.findById(carid).exec( (error,_car) => {
          if(error){
               console.log('------Error retrieving all car details-----');
               console.log(error);
               res.status(500).json({msg: 'error retrieving car details'})
          }
          else{
               if(_car){
                    let carObj = {};                   
                         carObj._id = _car._id;
                         carObj.status = _car.status;
                         carObj.vin = _car.vin;
                         carObj.make = _car.make;
                         carObj.model = _car.model;
                         carObj.type = _car.type;
                         carObj.year = _car.year;
                         carObj.exteriorColor = _car.exteriorColor;
                         carObj.interiorColor = _car.interiorColor;
                         carObj.sellingPrice = _car.sellingPrice;
                         let carImages = [];
                         _car.images.forEach(img => {
                              let imageString =`data:${img.img.contentType};base64,${img.img.data.toString('base64')}`;
                              carImages.push(imageString);
                         })
                        carObj.images = carImages;
                          
                    res.status(200).json({data: carObj});
                    }
                    else{
                         res.status(200).json({data: 'No data'});   
                    }
          }

     })
},
partialCarUpdateById(req, res){
const carid = req.params.carid;
let car = {};
if(req.body && req.body.status)
     car.status= req.body.status;

if(req.body && req.body.sellingPrice)
     car.sellingPrice = req.body.sellingPrice; 

  if(Object.keys(car).length ==0) {
       res.status(205).json({msg:'Please supply information you want to change'});
       return;
  } 
  console.log('---------------ABOUT TO PATCH-----');
  Car.updateOne({_id:carid},car).exec((error, data)=> {
     if(error){
          console.log('------Error performing carupdates-----');
          console.log(error);
          res.status(500).json({msg: 'error performing car updates'});
     }     
     else{
          res.status(203).json({msg: `car with id ${carid} was updated!`});
     }
  })
},

deleteCarById (req, res){
     const carid = req.params.carid;

    Car.findOneAndDelete(carid).exec( (error, result) => {
     if(error){
          console.log('------Error performing car deletion-----');
          console.log(error);
          res.status(500).json({msg: 'error performing car deletion'});
     }     
     else{
          res.status(203).json({msg: `car with id ${carid} was deleted!`});
     }   
    }) 
}
}

module.exports = carcontroller;