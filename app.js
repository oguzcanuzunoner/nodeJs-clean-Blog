const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const Post = require("./models/Post");
// const path = require('path')
const app = express();

mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

//ROUTES
app.get("/", async (req, res) => {
  //res.sendFile(path.resolve(__dirname,'views/index.html'))

  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
});

app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname,'views/index.html'))
  res.render("about");
});

app.get("/add_post", (req, res) => {
  //res.sendFile(path.resolve(__dirname,'views/index.html'))
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  console.log(req.files);

  // await Post.create(req.body);
  // res.redirect("/");
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
});

app.get("/post", (req, res) => {
  res.render("post");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portuna bağlandı.`);
});
