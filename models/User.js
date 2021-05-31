const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024
  },
})

module.exports = mongoose.model('Users', UserSchema)