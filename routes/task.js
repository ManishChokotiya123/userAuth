const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const task = mongoose.model("task");
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("../middleware/jwtServices");

router.get("/getAllTodoCards", async (req, res, next) => {
  try {
    let data = await task.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "list of todos",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// create the api verify the token
router.get("/getdata", async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    if (!token) {
      res.status(401).send({
        success: false,
        message: "token is null",
        data: null,
      });
    }
    const verifyTokendata = await verifyToken(token);
    console.log("33", verifyTokendata);
    if (verifyTokendata.length == 0) {
      return res.send(403).send({
        success: false,
        message: "token is not valid",
        data: null,
      });
    }
    console.log("41", verifyTokendata.data.taskName);
    const data = await task.find({ taskName: verifyTokendata.data.taskName });
    console.log("42:", data);
    return res.status(200).send({
      success: true,
      message: "task data show successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
router.post("/addtodoCard", async (req, res, next) => {
  try {
    let data = await task.create(req.body);
    const token = await generateToken(data);
    res.status(200).json({
      success: true,
      message: "add todos SuccessFully",
      data: { data: data, token: token },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
