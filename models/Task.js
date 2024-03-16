require("dotenv").config();

// models/Task.js
const mongoose = require("mongoose");
const connectDB = require("./db"); // Import the connectDB function

// Call the connectDB function to establish the connection
connectDB();

const taskSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    desc: { type: String },
    due_date: { type: Date },
    status: { type: String, enum: ["TODO", "DONE"], default: "TODO" },
    priority: { type: String },
    subtask:[]
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Task", taskSchema);

module.exports = Tasks;
