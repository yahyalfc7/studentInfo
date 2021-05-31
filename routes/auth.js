const express = require('express')
const router = express.Router()
const { RegisterNewUser } = require('../services/auth')

router.post('/register', async (req, res) => {
  try {
    const { token, data } = await RegisterNewUser(req);
    res.header('auth-token', token).status(200).json({ _id: data._id, email: data.email, isVerified: false, token })
    //returning the data along with token
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error })
  }
})

module.exports = router;
