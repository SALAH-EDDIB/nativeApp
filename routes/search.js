const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const _ = require("underscore");
const { uniq } = require("underscore");

router.get("/", async (req, res) => {
  try {
    const bycompagnie = await User.find({
      adresse: req.query.location
        ? new RegExp(".*" + req.query.location + ".*", "i")
        : { $exists: true },
      categorie: req.query.category
        ? new RegExp(".*" + req.query.category + ".*", "i")
        : { $exists: true },
      compagnie: req.query.query
        ? new RegExp(".*" + req.query.query + ".*", "i")
        : { $exists: true },
    });
    const byname = await User.find({
      adresse: req.query.location
        ? new RegExp(".*" + req.query.location + ".*", "i")
        : { $exists: true },
      categorie: req.query.category
        ? new RegExp(".*" + req.query.category + ".*", "i")
        : { $exists: true },
      name: req.query.query
        ? new RegExp(".*" + req.query.query + ".*", "i")
        : { $exists: true },
    });

    let result = _.union(bycompagnie, byname);

    result = _.uniq(result, (res) => res._id.toString());

    console.log(result);

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/location", async (req, res) => {
  if (req.query.query == "") return res.send("the query is empty");
  try {
    const result = await User.find({
      adresse: new RegExp(".*" + req.query.query + ".*", "i"),
    });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/category", async (req, res) => {
  try {
    if (req.query.query == "") return res.send("the query is empty");
    const result = await User.find({
      categorie: new RegExp(".*" + req.query.query + ".*", "i"),
    });

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/company", async (req, res) => {
  try {
    if (req.query.query == "") return res.send("the query is empty");
    const result = await User.find({
      compagnie: new RegExp(".*" + req.query.query + ".*", "i"),
    });

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.get("/name", async (req, res) => {
  try {
    if (req.query.query == "") return res.send("the query is empty");
    const result = await User.find({
      name: new RegExp(".*" + req.query.query + ".*", "i"),
    });

    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
