const Joi = require("joi")

//validation schema for user
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(1024).required(),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
