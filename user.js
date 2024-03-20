require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./db");
connectDB();

const userschema = new mongoose.Schema({
  id: { type: String },
  username: { type: String },
  password: { type: String },
  fullname: { type: String },
  phno: { type: Number },
});
const User = mongoose.model("User", userschema);

async function createuser(fullname, username, password, phno) {
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return "exists";
    }
    const user = new User();
    user.fullname = fullname;
    user.username = username;
    user.password = password;
    user.phno = phno;
    await user.save();
    console.log("user created");
    return "created";
  } catch (e) {
    console.log(e);
  }
}

module.exports = { User, createuser };
