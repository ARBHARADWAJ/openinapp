require("dotenv").config();

// models/Subtask.js
const mongoose = require("mongoose");
const connectDB = require("./db"); // Import the connectDB function

// Call the connectDB function to establish the connection
connectDB();


const subtaskSchema = new mongoose.Schema(
  {
    // task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    task_id: { type:String },
    description: { type: String },
    status: { type: Number, enum: [0, 1], default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtask", subtaskSchema);
