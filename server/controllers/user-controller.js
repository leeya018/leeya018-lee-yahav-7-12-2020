const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

signup = (req, res) => {
  let { username, password } = req.body;
  if (username == undefined || password == undefined) {
    return res.status(400).json({ message: "All fields need to be supplied" });
  }
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  UserModel.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (user) {
      return res.status(400).json({ message: "User is already exists in Db" });
    }
    let newUser = new UserModel({ username, password: hash, creationDate: new Date() })

    if (!newUser) {
      return res.status(400).json({ success: false, error: err })
    }
    newUser.save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: newUser._id,
          message: 'user created!',
        })
      }).catch(error => {
        return res.status(400).json({
          error,
          message: 'user not created!',
        })
      })
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

  UserModel.findOne({ username: username }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!user) {
      return res.status(400).json({
        message: "user does not exists"
      });
    }
    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password"
      });
    }
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 100, // 100 hour expiration
      username: user.username,
    }, process.env.PRIVATE_KEY);
    return res.status(200).json({
      message: "You are logged in",
      token: "Bearer " + token
    });
  })




}

module.exports = { signup, signin };
