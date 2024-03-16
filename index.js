require("dotenv").config();

// server.js
const express = require("express");
const connectDB = require("./models/db");
// const taskRoutes = require("./routes/taskRoutes");
// const subtaskRoutes = require("./routes/subtaskRoutes");
const jwt = require("jsonwebtoken");
const Tasks = require("./models/Task");
const user = require("./models/user");

const app = express();
connectDB();

// Middleware
app.use(express.json());

function jwtverificatoin(token) {
  try {
    const decode = jwt.verify(token, "secret");
    const uid = decode.user.phno;
    return uid;
  } catch (e) {
    console.log(e);
  }
}
app.get("/", (req, res) => {
  res.send("running");
});

app.post("/login", async (req, res) => {
  try {
    const { phno } = req.body;
    console.log(phno);
    if (!phno) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const userExists = await user.find({ phno: phno });
    console.log(userExists);
    if (userExists) {
      // Generate JWT token upon successful login
      const token = jwt.sign({ user: { phno } }, "secret", {
        expiresIn: "2h",
      });
      return res.json({ token, message: "User logged in successfully" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/all", async (req, res) => {
  const { token } = req.body;
  try {
    const uid = jwtverificatoin(token);
    console.log(uid);
    if (!uid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const data = await Tasks.find({ id: uid });
    console.log(data);
    return res.send(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addtask", async (req, res) => {
  const { token, title, desc, duedate, subtask } = req.body;
  try {
    const uid = jwtverificatoin(token);
    const task = new Tasks();
    task.title = title;
    task.id = uid;
    task.desc = desc;
    task.due_date = duedate;
    // task.status = "TODO";
    if (subtask) {
      task.subtask.psuh(subtask);
    }
    await task.save();
    console.log(task);

    res.send("data is pushed to tasks");
  } catch (e) {
    console.log(e);
  }
});

app.post("/addsubtask", async (req, res) => {
  try {
    const { taskid, desc } = req.body;
    const task = await Tasks.find({ id: taskid });
    const substask = {
      task_id: taskid,
      description: desc,
    };
    console.log(typeof task[0].subtask, " \n", task);
    task[0].subtask.push(substask);
    task[0].save();
    console.log(task);
    res.send("subtask added");
  } catch (e) {
    console.log(e);
  }
});

// process.env.JWT_SECRET
app.post("/register", (req, res) => {
  const { phno, priority } = req.body;
  try {
    const u = new user({});
    u.phno = phno;
    u.priority = priority;
    u.save();

    // const token = jwt.sign({ user: { phno, priority } }, "secret", {
    //   expiresIn: "2h",
    // });
    console.log(
      `User registered with phone number '${phno}' and priority '${priority}', token generated`
    );
    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to register user" });
  }
});

app.put("/updatetask/:taskId", async (req, res) => {
  const { token, title, desc, duedate } = req.body;
  const taskId = req.params.taskId;

  try {
    const uid = jwtverificatoin(token);
    if (!uid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: taskId, id: uid }, // Find the task by ID and user ID
      { title, desc, due_date: duedate }, // Update the specified fields
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(updatedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/deletetask/:taskId", async (req, res) => {
  const { token } = req.body;
  const taskId = req.params.taskId;

  try {
    const uid = jwtverificatoin(token);
    if (!uid) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const deletedTask = await Tasks.findOneAndDelete({ _id: taskId, id: uid });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/updatesubtask/:subtaskId", async (req, res) => {
  const { desc, status } = req.body;
  const subtaskId = req.params.subtaskId;

  try {
    const updatedSubtask = await subtask.findByIdAndUpdate(
      subtaskId, // Find the subtask by ID
      { description: desc, status }, // Update the specified fields
      { new: true } // Return the updated subtask
    );

    if (!updatedSubtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    return res.json(updatedSubtask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/deletesubtask/:subtaskId", async (req, res) => {
  const subtaskId = req.params.subtaskId;

  try {
    const deletedSubtask = await subtask.findByIdAndDelete(subtaskId);

    if (!deletedSubtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    return res.json({ message: "Subtask deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
