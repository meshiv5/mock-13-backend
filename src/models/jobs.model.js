const mongoose = require("mongoose");
const Joi = require("joi");
const JobsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    position: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    contract: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
    },
    location: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
  }
);

const Jobs = new mongoose.model("jobs", JobsSchema);

module.exports = Jobs;
