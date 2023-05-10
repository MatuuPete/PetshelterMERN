const Animal = require('../models/animal')
const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');


exports.getAnimals = async (req,res,next) => {
    // const products = await Product.find();
    const resPerPage = 4;
    const animalsCount = await Animal.countDocuments();

    const apiFeatures = new APIFeatures(Animal.find(),req.query).search().filter();

    apiFeatures.pagination(resPerPage);
    const animals = await apiFeatures.query;
    let filteredAnimalsCount = animals.length;

    // console.log(animalsCount)
    // console.log(filteredAnimalsCount)

    if(!animals) {
             return next(new ErrorHandler('Animal not found',404));
     }
    res.status(200).json({
        success: true,
        animalsCount,
        filteredAnimalsCount,
        resPerPage,
        animals
    })

}

// exports.getAnimals = async (req,res,next) => {
// 	// const animals = await Animal.find();
// 	const resPerPage = 4;
// 	const animalCount = await Animal.countDocuments();

// 	const apiFeatures = new APIFeatures(Animal.find(),req.query).search();
//     // const apiFeatures = new APIFeatures(Animal.find(),req.query);

// 	apiFeatures.pagination(resPerPage);
// 	const animals = await apiFeatures.query;
// 	let filteredAnimalCount = animals.length;

// 	if(!animals) {
// 	 		return next(new ErrorHandler('Animal not found',404));
// 	 }
// 	res.status(200).json({
// 		success: true,
// 		animalCount,
// 		filteredAnimalCount,
// 		resPerPage,
// 		animals
// 	})
// }


exports.newAnimal = catchAsyncErrors(async (req, res, next) => {

    // let animal_image = []
    // if (typeof req.body.animal_image === 'string') {
    //     animal_image.push(req.body.animal_image)
    // } else {
    //     animal_image = req.body.animal_image
    // }

    // let imagesLinks = [];

    // for (let i = 0; i < animal_image.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(animal_image[i], {
    //         folder: 'images'
    //     });

    //     imagesLinks.push({
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     })
    // }

    // req.body.animal_image = imagesLinks
    // req.body.user = req.user.id;

    const animal = await Animal.create(req.body);

    res.status(201).json({
        success: true,
        animal
    })
})

exports.updateAnimal = catchAsyncErrors(async (req, res, next) => {

    let animal = await Animal.findById(req.params.id);

    if (!animal) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // let images = []
    // if (typeof req.body.images === 'string') {
    //     images.push(req.body.images)
    // } else {
    //     images = req.body.images
    // }
    // if (images !== undefined) {
    //     // Deleting images associated with the product
    //     for (let i = 0; i < product.images.length; i++) {
    //         const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    //     }
    //     let imagesLinks = [];
    //     for (let i = 0; i < images.length; i++) {
    //         const result = await cloudinary.v2.uploader.upload(images[i], {
    //             folder: 'products'
    //         });

    //         imagesLinks.push({
    //             public_id: result.public_id,
    //             url: result.secure_url
    //         })
    //     }
    //     req.body.images = imagesLinks
    // }

    animal = await Animal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        animal
    })

})

exports.deleteAnimal = async (req,res,next) =>{
	const animal = await Animal.findById(req.params.id);
	if(!animal) {
	 		return res.status(404).json({
	 			success: false,
	 			message: 'Animal not found'
	 		})
	 }
	 await animal.remove();
	 res.status(200).json({
	 	success: true,
	 	message: 'Animal deleted'
	 })
}