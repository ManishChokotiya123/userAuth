const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
mongoose.model("task", taskSchema);
