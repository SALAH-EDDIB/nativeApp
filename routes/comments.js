const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();
const { Comment, validate } = require("../models/comment.model");

router.get("/:postId", auth, async (req, res) => {
  try {
    let result = await Comment.find({
      respondTo: null,
      post: req.params.postId,
    }).populate("writer", { name: 1 });
    if (result.length == 0) {
      return res.status(404).send("no Comment for this post.");
    }
    result.forEach((comment) => {
      if (comment.writer._id == req.user.id) {
        comment.myComment = true;
      } else {
        comment.myComment = false;
      }
    });

    const comments = result.map((comment) => {
      return new Object({
        date: comment.date,
        _id: comment._id,
        writer: comment.writer.name,
        post: comment.post,
        comment: comment.comment,
        respondTo: comment.respondTo,
        myComment: comment.myComment,
      });
    });

    res.send(comments);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.get("/:postId/:commentId", auth, async (req, res) => {
  try {
    const result = await Comment.find({
      respondTo: req.params.commentId,
      post: req.params.postId,
    }).populate("writer");

    if (result.length == 0) {
      return res.status(404).send("no respond for this comment");
    }

    result.forEach((comment) => {
      if (comment.writer == req.user._id) {
        comment.myComment = true;
      } else {
        comment.myComment = false;
      }
    });

    res.send(result);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = new Comment({
    writer: req.user.id,
    post: req.body.postId,
    comment: req.body.comment,
  });

  try {
    const result = await comment.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const comment = new Comment({
    writer: req.user._id,
    post: req.body.postId,
    respondTo: req.params.id,
    comment: req.body.comment,
  });

  try {
    const result = await comment.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        comment: req.body.comment,
      },
      { new: true }
    );

    if (!comment) {
      return res
        .status(404)
        .send("The comment with the given ID was not found.");
    }

    res.send(comment);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);

    if (!comment)
      return res
        .status(404)
        .send("The comment with the given ID was not found.");
    console.log(comment);
    res.send(comment);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

module.exports = router;
