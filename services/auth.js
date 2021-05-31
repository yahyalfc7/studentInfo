

const User = require('../models/User')
const { registerValidation } = require('../utils/validation')
const jwt = require('jsonwebtoken')

function RegisterNewUser(req) {
  const { name, email, password } = req.body;

  return new Promise(async (resolve, reject) => {
    try {
      const { error } = registerValidation(req.body) // validation schema Joi
      if (error) {
        return reject(error.details[0].message)
      }
      // check if email already exists
      const emailExists = await User.findOne({ email: email })
      if (emailExists) {
        return reject('Email Already Exists')
      }

      const user = User({
        name,
        email,
        password,
      }); //a new user. instance created with the model User

      const result = await user.save()
      console.log(result);
      const token = jwt.sign({ _id: result._id }, process.env.JWT_TOKEN)

      resolve({ token, data: result })
    }
    catch (error) {
      reject(error)
    }
  })
}

module.exports = { RegisterNewUser }


