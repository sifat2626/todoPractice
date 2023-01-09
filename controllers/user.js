const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const asyncHandler = require("express-async-handler");

//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
//Create User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, userName } = req.body;
  let {confirmPassword} = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt);
  //   confirmPassword = hashedConfirmPassword;
  //validation
  if (!name || !email || !password || !confirmPassword || !userName) {
    res.status(400);
    throw new Error("Please fill the required fields");
  }
  
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }
  
  //check if user exists
  const exists = await (User.findOne({userName}) || User.findOne({email}));
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }
  if(password !== confirmPassword)
  {
    res.status(400);
    throw new Error("password didn't match");
  }
  //create new user
  const user = await User.create({
    name,
    userName,
    email,
    password,
    confirmPassword
  });
  
  //generate token
  const token = generateToken(user._id);
  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 1000 * 86400), // 7 day
    sameSite: "none",
    secure: true,
  });
  if (user) {
    const { _id, name, email, mobileNumber, city , userName } = user;
    res.status(201).json({
      _id,
      name,
      email,
      mobileNumber,
      city,
      userName,
      token
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

});
//Login User
const userLogin = asyncHandler(async (req,res)=>{
  const {password,userName} = req.body;
  if(!userName || !password)
  {
    res.status(400);
    throw new Error("please fill in all the fields");
  }
  // Check if user exists
  const user = await (User.findOne({userName}));
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist,please signup");
  }
  // User exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  //   Generate Token
  const token = generateToken(user._id);
  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    // secure: true,
  });
  if (user && passwordIsCorrect) {
    const { _id, name, email, mobileNumber, city , userName } = user;
    res.status(200).json({
      message:"login successful!",
      _id,
      name,
      email,
      mobileNumber,
      city,
      userName,
      token
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
})
//Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    // secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

module.exports = {
    registerUser,
    userLogin,
    logout,
}