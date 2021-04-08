const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const router = express.Router();
const { Post, validate } = require("../models/post.model");
const { Save, validateSave } = require("../models/savePost.model");
const multer = require("multer");
const { object } = require("underscore");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname + ".png"
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", auth, async (req, res) => {
  try {
    const result = await Post.find();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("The post with the given ID was not found.");
    }
    res.send(post);
  } catch (ex) {
    res.status(404).send("The  given ID is not valid . ");
  }
});

router.post("/", upload.single("image"), [auth], async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post({
    title: req.body.title,
    author: req.user.id,
    image: req.file.path,
    content: req.body.content,
  });

  try {
    const result = await post.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put("/:id", upload.single("image"), [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.user.id,
        image: req.file.path,
        content: req.body.content,
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).send("The post with the given ID was not found.");
    }

    res.send(post);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const post = await Post.findByIdAndRemove(req.params.id);

    if (!post)
      return res.status(404).send("The post with the given ID was not found.");
    res.send(post);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.post("/save/post", auth, async (req, res) => {
  const { error } = validateSave(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const save = new Save({
    userId: req.user.id,
    post: req.body.postId,
  });

  try {
    const result = await save.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get("/save/post", auth, async (req, res) => {
  try {
    const posts = await Save.find({ userId: req.user.id })
      .populate("post")
      .select("post");

    if (!posts) {
      return res.status(404).send(" No post saved ");
    }

    const responde = posts.map((post) => {
      return new Object({
        date: post.post.date,
        _id: post.post._id,
        title: post.post.title,
        author: post.post.author,
        image: post.post.image,
        content: post.post.content,
      });
    });

    res.send(responde);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.get("/save/post/:id", auth, async (req, res) => {
  try {
    const post = await Save.find({ userId: req.user.id, post: req.params.id });

    if (!post) {
      return res.status(404).send(" No post saved ");
    }
    res.send(post);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.delete("/save/post/:id", auth, async (req, res) => {
  try {
    const save = await Save.findByIdAndRemove(req.params.id);

    if (!save)
      return res.status(404).send("The post with the given ID was not found.");
    res.send(save);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

module.exports = router;
