const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const ejs = require("ejs");
const methodOverride = require("method-override");
const postController = require("./controllers/postControllers");
const pageController = require("./controllers/pageControllers");
const app = express();

mongoose.connect("mongodb+srv://oguzcan:RCekXXSOIae55igf@cluster0.svx4m.mongodb.net/clean-blog-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//ROUTES
app.get("/", postController.getAllPosts);
app.post("/posts", postController.createPost);
app.get("/posts/:id", postController.getPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

app.get("/about", pageController.getAboutPage);

app.get("/add_post", pageController.getAddPage);

app.get("/posts/edit/:id", pageController.getEditPage);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portuna bağlandı.`);
});
