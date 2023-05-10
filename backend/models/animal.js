const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    animal_image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    animal_name: {
        type: String,
        required: [true, 'Please enter animal name'],
        trim: true,
        maxLength: [100, 'animal name cannot exceed 100 characters']
    },

    animal_breed: {
        type: String,
        required: [true, 'Please enter animal breed'],
        trim: true,
        maxLength: [100, 'animal name cannot exceed 100 characters']
    },

    animal_type: {
        type: String,
        required: [true, 'Please enter animal type'],
        trim: true,
        maxLength: [100, 'animal name cannot exceed 100 characters']
    },

    animal_gender: {
        type: String,
        required: [true, 'Please enter animal gender'],
        trim: true,
        maxLength: [100, 'animal name cannot exceed 100 characters']
    },

    animal_age: {
        type: Number,
        required: [true, 'Please enter animal age'],
        trim: true,
        maxLength: [100, 'animal name cannot exceed 100 characters']
    },

    date_rescued: {
        type: Date,
        required: [true, 'Please enter rescue date'],
        trim: true,
    },


    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

})

module.exports = mongoose.model('Animals', animalSchema);

