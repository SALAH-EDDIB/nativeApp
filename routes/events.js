const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const router = express.Router();
const { Event, validate } = require("../models/event.model");

router.get("/", auth, async (req, res) => {
  const result = await Event.find();
  res.send(result);
});

router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).send("The event with the given ID was not found.");
    }
    res.send(event);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      organizer: req.user.id,
    });
    const result = await event.save();
    res.send(result);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put("/:id", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
      { new: true }
    );

    if (!event) {
      return res.status(404).send("The post with the given ID was not found.");
    }

    res.send(event);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.params.id);

    if (!event)
      return res.status(404).send("The post with the given ID was not found.");
    res.send(event);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

module.exports = router;
