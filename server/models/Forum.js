const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
    title: String,
    createdAt: String,
    categoryId: mongoose.ObjectId,
    NumberThread:Number,
    userId: mongoose.ObjectId
});


const Forum = mongoose.model('Forum', ForumSchema);
module.exports = Forum;