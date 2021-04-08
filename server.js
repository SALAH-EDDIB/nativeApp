require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const post = require("./routes/posts");
const comment = require("./routes/comments");
const event = require("./routes/events");
const search = require("./routes/search");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

//User require
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");

// Passport config
require("./config/passport")(passport);

// Create Express server
const app = express();
const port = process.env.PORT || 5000;

// Setup our middleware
app.use(cors());
app.use(express.json());
app.use("/posts", post);
app.use("/comments", comment);
app.use("/event", event);
app.use("/search", search);
app.use("/uploads", express.static("uploads"));
app.use("/users", users);

// Passport middleware
app.use(passport.initialize());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB Atlas
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//wire up the server to listen to our port 500
app.listen(port, () => {
  console.log(`Server is running on port: ${port} !`);
});
