const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  let token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send("Access Denied : No Token provided .");

  try {
    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, require("../config/keys").secretOrKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
