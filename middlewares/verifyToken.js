const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Access denied! Provide Token in header' })

  const tokenDecrypted = jwt.verify(token, process.env.JWT_TOKEN) // this returns the object we were using to make token. role is in here.
  const { _id } = tokenDecrypted;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Invalid object id");
  }

  next()
}
