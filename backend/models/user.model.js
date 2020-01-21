/*Database schema for workers table*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    Phone: {
        type: String,
        required: true,
        unique: true,
        digit: true
    },

    Password: {
        type: String,
        required: true
    },

    IsAdmin: {
        type: Boolean,
        default: false
    },

    Coordinate: {
        x: {
            type: Number,
            default: 0.00,
        },
        y: {
            type: Number,
            default: 0.00,
        }
    },

    Date: { type: Date, default: Date.now },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);