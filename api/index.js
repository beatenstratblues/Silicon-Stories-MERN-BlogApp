const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  res.json(req.body);
});

app.listen(8000, () => {
  console.log("Server has started on PORT: 8000");
});
