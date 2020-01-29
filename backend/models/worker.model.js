/*Database schema for workers table*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var workerSchema = new Schema({
    Name: {
        type: String,
        required: true
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

    Category: {
        type: String,
        required: true
    },

    Image: {
        type: String,
        required: true
    },

    IsAdmin: {
        type: Boolean,
        default: false
    },

    IsWorker: {
        type: Boolean,
        default: true
    },

    Active_status: {
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

    Rating: {
        rating: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }
});

workerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Worker', workerSchema);