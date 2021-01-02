const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAuth = require('../middlewares/isAuth');

const User = mongoose.model('User');

router.get("/me", isAuth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.put("/me", isAuth, async (req, res) => {
  try {
    delete req.body._id;

    User.updateOne(
      {"_id": req.user.id },
      req.body,
      function (err, result) {
        if(err) {
          res.status(500).json({
            success: false,
            message: err.message
          })
        } else {
          res.json(result);
        }
    });

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

module.exports = router;