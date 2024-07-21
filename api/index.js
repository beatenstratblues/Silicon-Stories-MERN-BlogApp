const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userModel } = require("./models/userModel");
const { saltHashing } = require("./Services/saltHasing");
const jwt = require("jsonwebtoken");
const { secretKey } = require("./Constants/SecretKey");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const { PostModel } = require("./models/postModel");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/MernBlog")
  .then(() => console.log("MongoDb connected.."));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = saltHashing(password);
  try {
    const userDoc = await userModel.create({
      username,
      password: hashedPassword,
    });
    return res.json(userDoc);
  } catch (e) {
    return res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await userModel.findOne({ username });

  const givenPasswordHash = saltHashing(password);

  if (userDoc.password === givenPasswordHash) {
    //loggedin
    jwt.sign({ username, id: userDoc._id }, secretKey, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    return res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, (err, info) => {
    //this provides us the entire object back after verify, the object ebign mentioned here is the one that we used for creating the jwt token i.e the user information object
    if (err) throw err;
    return res.json(info);
  });
});

app.post("/logout", (req, res) => {
  return res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  const { title, summary, content } = req.body;

  jwt.verify(token, secretKey, {}, async (err, info) => {
    //this provides us the entire object back after verify, the object ebign mentioned here is the one that we used for creating the jwt token i.e the user information object
    if (err) throw err;
    const PostDoc = await PostModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
  });
  return res.json("ok");
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  const { id, title, summary, content } = req.body;

  jwt.verify(token, secretKey, {}, async (err, info) => {
    //this provides us the entire object back after verify, the object ebign mentioned here is the one that we used for creating the jwt token i.e the user information object
    if (err) throw err;
    const PostDoc = await PostModel.findById(id);
    const isAuthor = JSON.stringify(PostDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }
    await PostModel.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : PostDoc.cover,
    });

    return res.json(PostDoc);
  });
});

app.get("/posts", async (req, res) => {
  const posts = await PostModel.find({})
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  return res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const postData = await PostModel.findById(req.params.id).populate("author", [
    "username",
  ]);
  return res.json(postData);
});

app.listen(8000, () => {
  console.log("Server has started on PORT: 8000");
});
