const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({   
    createdAt: String,
    threadId: mongoose.ObjectId,
    content: String,
    userId: mongoose.ObjectId
});


const Post = mongoose.model('Post', PostSchema);
module.exports = Post;