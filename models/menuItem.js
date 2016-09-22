var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var menuItemSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    ingredients: [],
    status: String
});

module.exports = mongoose.model('menuItem', menuItemSchema);