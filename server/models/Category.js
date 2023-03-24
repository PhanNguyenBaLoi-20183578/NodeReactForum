const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: String,
    createdAt: String,
    NumberForum:Number
});


const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
