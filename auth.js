// middleware/auth.js
require("dotenv").config();
const { createuser, User } = require("./user");
const jwt = require("jsonwebtoken");

async function verification(token) {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = decode.user;
    const finduser = await User.findOne({
      username: user.username,
      password: user.password,
    });
    if (finduser) {
      return { result: true, finduser: finduser };
    } else {
      return { result: false };
    }
  } catch (e) {
    console.log(e);
  }
}

async function tokenisation(username, password) {
  try {
    const finduser = await User.findOne({
      username: username,
      password: password,
    });
    if (finduser) {
      const user = {
        username: username,
        password: password,
      };
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      return { result: true, token: token };
    } else {
      console.log(finduser);
      return { result: false, error: "user need to register" };
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateuserddata(token, fullname, phno) {
  try {
    const userd = await verification(token);

    if (userd.result) {
      const finduser = await User.findOne({
        username: userd.finduser.username,
        password: userd.finduser.password,
      });

      if (finduser) {
        finduser.fullname = fullname;
        finduser.phno = phno;
        const updateuser = await finduser.save();
        return { result: true, userdata: updateuser };
      } else {
        return { result: false };
      }
    }
  } catch (e) {
    console.log(e);
  }
}

async function deleteuser(token) {
  try {
    const users = await verification(token);
    if (users.result) {
      const usesdata = users.finduser;
      const duser = await User.findOneAndDelete({
        username: usesdata.username,
        password: usesdata.password,
      });
      return duser;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = { verification, tokenisation, updateuserddata, deleteuser };
