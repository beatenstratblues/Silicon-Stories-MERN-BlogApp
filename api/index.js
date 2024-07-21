const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userModel } = require("./models/userModel");
const { saltHashing } = require("./Services/saltHasing");
const jwt = require("jsonwebtoken");
const { secretKey } = require("./Constants/SecretKey");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

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
        id:userDoc._id,
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

app.listen(8000, () => {
  console.log("Server has started on PORT: 8000");
});
