const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { RegisterNewUser } = require('../services/auth')

router.get('/all', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error })
  }
})

router
  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
      res.status(200).json({ data: user })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })
  .put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      await User.updateOne({ _id: id }, { $set: { name, email, password } }) // updating all values cuz put updates the whole object
      const responce = await User.findById({ _id: id })
      res.status(200).json({ data: responce })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })
  .patch("/:id", async (req, res) => {
    const { id } = req.params;

    const entries = Object.keys(req.body)
    const updates = {}
    //dynamically updating only those values which are sent in the request. cuz patch only changes the values sent in request
    entries.forEach((entry, index) => updates[entries[index]] = Object.values(req.body)[index])

    try {
      await User.updateOne({ _id: id }, { $set: updates })
      const user = await User.findById({ _id: id })
      res.status(200).json({ data: user })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });
      res.status(200).json({ _id: id, status: 'deleted' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error })
    }
  })


module.exports = router;
