const Joi = require("joi");

const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    image: { type: String },
    content: { type: String },
    date: { type: Date, default: Date.now() },
  })
);

function validatepost(post) {
  const schema = {
    title: Joi.string().min(5).max(255).required(),
    image: Joi.string(),
    content: Joi.string(),
  };

  return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatepost;
