const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) {
    res.status(401);
    throw new Error("token didn't match");
  }
  const user = await User.findById(verified.id).select("-password");
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  req.user = user;
  // console.log(`========>${req.user.userName}`)
  next();
});
module.exports = protect;
