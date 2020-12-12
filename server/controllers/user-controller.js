const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const util = require("../util")

signup = (req, res) => {
  let { username, password } = req.body;
  if (username == undefined || password == undefined) {
    return res.status(400).json({ message: "All fields need to be supplied" });
  }
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  let foundUser = util.findUser(username, password)
  if (foundUser) {
    return res.status(400).json({ message: "User is already exists in Db" });
  }
  let newUser = { username, password: hash, creationDate: new Date() }

  let userId = util.addUser(newUser)
  return res.status(201).json({
    success: true,
    id: userId,
    message: 'user created!',
  })
}
signin = (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.json({
      status: 400,
      errMessage: "You need to feel all fields"
    });
  }

  let foundUser = util.findUser(username, password)
  if (!foundUser) {
    return res.status(400).json({
      message: "user does not exists"
    });
  }
  let isMatch = bcrypt.compareSync(password, foundUser.password);
  if (!isMatch) {
    return res.status(401).json({
      message: "Wrong password"
    });
  }
  let token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 100, // 100 hour expiration
    username: foundUser.username,
  }, process.env.PRIVATE_KEY);
  return res.status(200).json({
    message: "You are logged in",
    token: "Bearer " + token
  });
}

module.exports = { signup, signin };
