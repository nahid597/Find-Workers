/*Database schema for workers table*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

var categorySchema = new Schema({
    image: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true,
        unique: true,
        digit: true
    },

    description: {
        type: String,
        required: true
    },

    Date: { type: Date, default: Date.now }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);