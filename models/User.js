const mongoose = require("mongoose")

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('user', User)
