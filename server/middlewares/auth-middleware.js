const jwt = require("jsonwebtoken");
require("dotenv").config();

//authenticate the user which want to connect , 
//only users with valid tokens can connect and see their own emails
function authenticate(req, res, next) {
  let auth = req.headers.authorization;
  
  let token = auth.split(" ")[1];
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    if (decoded.username !== req.params.username) {
        return res.status(401).json({ message: "You are not allowed to see those emails" });
    } else {
      next();
    }
  });
}

// check that all fields are filled with data
validateFields = (req, res, next) => {
  let { username, password } = req.body
  let errMessages = []
  if (!username) {
    errMessages.push("username is missing")
  }
  if (!password) {
    errMessages.push("password is missing")
  }
  if (errMessages.length > 0) {
    return res.status(400).json({
      success: false,
      validation: false,
      errors: errMessages
    })
  }
  next()
}

module.exports = { authenticate,validateFields };