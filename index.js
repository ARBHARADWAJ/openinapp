require("dotenv").config();

// server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { User, createuser } = require("./user");
const app = express();
app.use(express.json());
const {
  verification,
  tokenisation,
  updateuserddata,
  deleteuser,
} = require("./auth");

//deleteuser

app.get("/", (req, res) => {
  res.status(200).send("jai shree ram");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await tokenisation(username, password);
  if (result.result) {
    res.status(200).send({
      message: "user logged in here is your token: ",
      token: result.token,
    });
  } else {
    res.status(201).send("need to register");
  }

  //login
});
app.post("/register", async (req, res) => {
  const { fullname, username, password, phno } = req.body;
  const result = await createuser(fullname, username, password, phno);
  if (result === "created") {
    console.log(result);
    res.status(200).send("completed registering you can process to login");
  } else {
    res.status(200).send("user already exists");
  }
});

app.post("/update", async (req, res) => {
  const { token, fullname, phno } = req.body;
  const result = await updateuserddata(token, fullname, phno);
  if (result.result) {
    res.status(200).send({ updateduser: result.userdata });
  } else {
    res.status(201).send({ message: "internal error" });
  }
});

app.post("/userdetails", async (req, res) => {
  const { token } = req.body;
  const userdetails = await verification(token);

  if (userdetails.result) {
    res.status(200).send({ userdetails: userdetails.finduser });
  } else {
    res.status(201).send({ message: "user not found or token is invalid" });
  }

  // return userdetails;
});
app.delete("/delete", async (req, res) => {
  const { token } = req.body;
  const duser = await deleteuser(token);
  res.status(200).send({ message: duser });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
