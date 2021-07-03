const Post = require("../models/Post");
const fs = require("fs");

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;
  const totalPhotos = await Post.find().countDocuments();

  const posts = await Post.find({})
  .sort("-dateCreated")
  .skip((page-1)*photosPerPage)
  .limit(photosPerPage)

  res.render("index", {
      posts:posts,
      current:page,
      pages: Math.ceil(totalPhotos / photosPerPage)
    })

  // const posts = await Post.find({}).sort("-dateCreated");
  // res.render("index", {
  //   posts,
  // });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", { post });
};

exports.createPost = async (req, res) => {
  const uploadDir = "public/uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Post.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.description = req.body.description;
  post.save();

  res.redirect(`/post/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  const photo = await Post.findOne({ _id: req.params.id });
  let deleteImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deleteImage);
  await Post.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
