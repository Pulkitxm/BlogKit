const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    likes:Number
})

module.exports = mongoose.model("Blog",BlogSchema)