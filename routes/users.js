const express = require('express');
const router = express.Router();
const User = require('../models/user');


// 🔹 CREATE USER (POST)
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});


// 🔹 GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


// 🔹 GET USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});


// 🔹 UPDATE USER (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});


// 🔹 DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({
      message: 'User Deleted Successfully',
      name: deletedUser.name
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;