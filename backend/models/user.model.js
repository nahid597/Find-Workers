/*Database schema for workers table*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var userSchema = new Schema({

    Name: {
        type: String,
        required: true,
    },

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

    IsWorker: {
        type: Boolean,
        default: false
    },

    Coordinate: {
        lat: {
            type: Number,
            default: 24.363588,
        },
        lng: {
            type: Number,
            default: 88.624138,
        }
    },

    Date: { type: Date, default: Date.now },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);