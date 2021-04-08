const Joi = require("joi");

const mongoose = require("mongoose");

const Save = mongoose.model(
  "Archive",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  })
);

function validateSave(post) {
  const schema = {
    postId: Joi.objectId().required(),
  };

  return Joi.validate(post, schema);
}

exports.Save = Save;
exports.validateSave = validateSave;
