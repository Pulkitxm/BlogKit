const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
main()
    .then(()=>{
        console.log("connected to mongo");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BlogKit');
}

const Blog = require("./models/blog")
const testBlog = new Blog({
    "title": "My First Bog",
    "author": "Pukit",
    "content": "Pulkit\n  **Title:** My Amazing Blog\n  \n  **Author:** John Doe\n  \n  **Date:** September 27, 2023\n  \n  **Introduction:**\n \n  (img){https://images.unsplash.com/photo-1683009680116-b5c04463551d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80}\n\n  Welcome to my amazing blog where I share my thoughts and experiences with the world. In this blog post, I'll cover a variety of topics, including technology, travel, and more.\n  \n  **Heading 1: Technology Trends**\n  \n  In recent years, technology has advanced at an incredible pace. From the rise of artificial intelligence to the development of self-driving cars, we're living in an exciting time. \n  \n  **Heading 2: Travel Adventures**\n  \n  I've had the privilege of traveling to many beautiful places around the world. One of my favorite destinations is the stunning beaches of Bali. The crystal-clear waters and vibrant culture make it a must-visit location for any traveler.\n  \n  **Bold and Italics:**\n  \n  - *Emphasizing important points in your blog is essential.*\n  - **Using bold text can grab the reader's attention.**\n  \n  **Inserting Images:**\n  \n  **Creating Links:**\n  \n  Visit the official Bali tourism website [here](https://www.bali.com/) to learn more about this beautiful island.\n  \n  **Conclusion:**\n  \n  I hope you enjoyed reading my blog post. Stay tuned for more exciting content in the future!\n  \n  Remember to use your text editor's features to format and style the content as needed. Enjoy writing your blog!\n  ",
    "likes": 0
})

// Blog.deleteMany({}).then(()=>{
//     console.log("Al blogs deleted");
// })
// Blog.find({})
//     .then((blogs)=>{
//         console.log(blogs);
//     })
// testBlog.save()

app.get("/blogs", async (req, res) => {
    await Blog.find({})
    .then((blogs)=>{
        res.send(blogs)
    })
})

app.post("/blogs", async (req, res) => {
    const newBlog = new Blog({
        title:req.body.title,
        author:req.body.author,
        content:req.body.content,
        likes:req.body.likes
    })
    await newBlog.save()
    .then((blog)=>{
        res.send(`new Blog is added with id ${newBlog._id}`)
    })
})

app.get("/blog/:id", async (req, res) => {
    await Blog.findById(req.params.id)
    .then((blog)=>{
        res.send(blog)
    })
})

app.put("/blog/:id", async (req, res) => {
    //get body for blog
    await Blog.findByIdAndUpdate(req.params.id, {content: req.body.content} , { new: true })
    .then(()=>{
        res.send(`Blog with id ${req.params.id} is updated`)
    })
})

app.delete("/blog/:id", async (req, res) => {
    //get body for blog
    await Blog.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.send(`Blog with id ${req.params.id} is deleted`)
    })
})

app.get("/:author/blogs", async (req, res) => {
    await Blog.find({author: req.params.author})
    .then((blogs)=>{
        res.send(blogs)
    })
})

app.delete("/:author/blogs", async (req, res) => {
    await Blog.deleteMany({author: req.params.author})
    .then((blogs)=>{
        res.send(`Blogs with author ${req.params.id} are deleted`)
    })
})

const port = 3001
app.listen(port,()=>{
    console.log(`app is istening at port ${port}`);
})