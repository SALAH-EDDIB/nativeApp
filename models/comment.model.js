const Joi = require("joi");

const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    respondTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    comment: { type: String },
    myComment: { type: Boolean, default: null },
    date: { type: Date, default: Date.now() },
  })
);

function validatecomment(post) {
  const schema = {
    postId: Joi.objectId(),
    respondTo: Joi.objectId(),
    comment: Joi.string(),
  };

  return Joi.validate(post, schema);
}

exports.Comment = Comment;
exports.validate = validatecomment;
