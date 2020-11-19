const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const attachCurrentUser = require('../middlewares/attachCurrentUser');

const User = mongoose.model('User');

router.get("/me", attachCurrentUser, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;