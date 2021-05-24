const express = require('express');
const router = express.Router();
const carcontroller = require('../controller/cars-controller');
const carimagecontroller = require('../controller/car-images-controller');
const uploader = require('../common/upload');

router.route('/')
            .get( carcontroller.getAllCars)
            .post(uploader().single('carImage'),carcontroller.addNewCar);
router.route('/:carid')
          .get(carcontroller.getOneCarById)
          .patch(carcontroller.partialCarUpdateById)
          .delete(carcontroller.deleteCarById)
router.route('/:carid/images')
      .post(uploader().single('carImage'),carimagecontroller.addcarImage)

module.exports = router;