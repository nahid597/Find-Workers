/*Database schema for workers table*/

const mongoose = require('mongoose');
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

    Catagory: {
        type: String,
        required: true
    },

    Active_status: {
        type: Boolean,
        default: false
    },

    Coordinate_self: {
        x: {
            type: Number,
            default: 0.00,
        },
        y: {
            type: Number,
            default: 0.00,
        }
    },

    Coordinate_user: {
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
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Worker', workerSchema);