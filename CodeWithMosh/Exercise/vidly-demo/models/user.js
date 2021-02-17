const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        required: true
    },
    email : {
        type: String,
        unique: true,
        min:5,
        max: 255,
        required : true
    }, 
    password : {
        type: String,
        min: 3,
        max: 255,
        required: true
    }
}));

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });

    return schema.validate(user);
}

exports.validate = validate;
exports.User = User;