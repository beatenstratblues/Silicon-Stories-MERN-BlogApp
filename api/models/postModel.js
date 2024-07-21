const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = model("post", postSchema);

module.exports = { PostModel };
