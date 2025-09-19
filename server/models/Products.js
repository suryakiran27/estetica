const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String
})

const Products = mongoose.model('products', productsSchema);
module.exports = Products;

