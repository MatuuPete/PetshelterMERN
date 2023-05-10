const ErrorHandler = require('../utils/errorHandler')
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const cloudinary = require('cloudinary');
const Health = require('../models/health');


exports.getHealth = async (req,res,next) => {
	// const products = await Product.find();
	const health = await Health.find();
	res.status(200).json({
		success: true,
        health
	})
	
}

//add DETAILS in health
exports.newHealth = catchAsyncErrors(async (req, res, next) => {

    // const { name, category, description } = req.body;

    // const health = await Health.create(
    //     name, category, description
    // );

    const health = await Health.create(req.body);

    res.status(201).json({
        success: true,
        health
    })
})

//edut details in health
exports.getHealthDetails = async (req, res, next) => {
    const health = await Health.findById(req.params.id);

    if (!health) {
        return next(new ErrorHandler(`Health does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        health
    })
}

//update deaitils in health

exports.updateHealth = catchAsyncErrors(async (req, res, next) => {

    let health = await Health.findById(req.params.id);

    if (!health) {
        return next(new ErrorHandler('Health not found', 404));
    }
    health = await Health.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        health
    })

})

// exports.deleteHealth = async (req,res,next) =>{
    exports.deleteHealth = async (req,res,next) =>{
        const health = await Health.findById(req.params.id);
        if(!health) {
                 return res.status(404).json({
                     success: false,
                     message: 'Health not found'
                 })
         }
         await health.remove();
         res.status(200).json({
             success: true,
             message: 'Health deleted'
         })
    }