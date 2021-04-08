const Joi = require("joi");

const mongoose = require("mongoose");

const Event = mongoose.model(
  "Event",
  new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    startDate: { type: Date, default: Date.now() },
    endDate: { type: Date, default: null },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  })
);

function validateEvent(event) {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow(null),
  };

  return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;
