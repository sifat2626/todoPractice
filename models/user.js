const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    mobileNumber: {
      type: String,
      default: "+880",
    },
    city: { type: String },
    userName: {
      type: String,
      unique: true,
      required: [true, "Please add a valid username"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    const hashedConfirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    this.confirmPassword = hashedConfirmPassword;
    next();
  });
//Model
const User = mongoose.model('User',userSchema);
module.exports = User;
