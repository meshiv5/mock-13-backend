const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    applied: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "jobs",
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("user", UserSchema);
User.getJWT = async (user) => {
  return jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.SECRET_KEY, {
    expiresIn: "7days",
  });
};

const validateUser = (user) => {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    name: Joi.string().min(5).max(1024).required(),
  };
  return Joi.object(schema).validate(user);
};

module.exports = { User, validateUser };
