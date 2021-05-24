This API is intended for managing car display (showroom)
The schemas includes Car as main documents with two sub-documents, Dealer and Image.
CRUD operations for car which includes uploading images on initial car creation is completed, this retrieving car and images from the database
CRUD operations for dealer has not started
CRUD operations for Image only adding images to existing car list of images is completed
I will complete the CRUD operations for Image by 10 am tomorrow
CRUD operations for Dealer will be completed tomorrow
The Car api accepts and processes form data, reads the images using multer library, converts the image to buffer and stores them in mongodb.
To retrieve the image, image is read and converted from buffer to base64 format.

BELOW ARE THE ENDPOINTS
router.route('/')
            .get( carcontroller.getAllCars)
            .post(uploader().single('carImage'),carcontroller.addNewCar);
router.route('/:carid')
          .get(carcontroller.getOneCarById)
          .patch(carcontroller.partialCarUpdateById)
          .delete(carcontroller.deleteCarById)
router.route('/:carid/images')
      .post(uploader().single('carImage'),carimagecontroller.addcarImage)
      
 The API uses uploader module which retrives image file from the uploaded form data. The screen short of the module is attached.
 The controller reads the contents of the file and saves to the database. The screen short of the section of the controller is attached.
