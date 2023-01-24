let express = require("express");
const auth = require("../middlewares/auth.middleware");
const Router = express.Router();
let JobsModel = require("../models/jobs.model");
Router.post("/", auth, async (req, res) => {
  try {
    let { companyName, position, contract, location } = req.body;
    let job = new JobsModel({
      companyName,
      position,
      contract,
      location,
    });

    await job.save();
    res.status(201).send({ status: true, message: "Jobs Created Successfully !" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
Router.get("/", auth, async (req, res) => {
  try {
    let jobs = await JobsModel.find({});
    res.status(201).send({ status: true, jobs: jobs });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
Router.get("/:jobId", auth, async (req, res) => {
  try {
    let { jobId } = req.params;
    let job = await JobsModel.findOne({ _id: jobId });
    if (!job) return res.status(400).send({ status: false, message: "Job Not Found!" });
    res.status(201).send({ status: true, message: "Jobs Found Successfully !", job: job });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
Router.delete("/:jobId", auth, async (req, res) => {
  try {
    let { jobId } = req.params;
    await JobsModel.deleteOne({ _id: jobId });
    res.status(201).send({ status: true, message: "Jobs Deleted Successfully !" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
Router.patch("/:jobID", auth, async (req, res) => {
  try {
    let { jobID } = req.params;
    let { companyName, position, contract, location } = req.body;
    let job = JobsModel.findOne({ _id: jobID });
    if (!job) {
      return res.status(400).send({ status: false, message: "Some Error Occured !" });
    }
    job.companyName = companyName ?? job.companyName;
    job.position = position ?? job.position;
    job.contract = contract ?? job.contract;
    job.location = location ?? job.location;
    await job.save();
    res.status(201).send({ status: true, message: "Jobs Edited Successfully !" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ status: false, message: "Some Error Occured !" });
  }
});
module.exports = Router;
