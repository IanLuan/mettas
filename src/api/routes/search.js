const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAuth = require('../middlewares/isAuth');

const User = mongoose.model('User');
const Metta = mongoose.model('Metta');

router.get("/search", isAuth, async (req, res) => {

  if(!req.query.type) {
    res.status(500).json({
      success: false,
      message: "'Type' query param is mandatory"
    })
    res.end();
  } else if(req.query.type != "metta" && req.query.type != "user") {
    res.status(500).json({
      success: false,
      message: "'Type' query param must be 'metta' or 'user'."
    })
    res.end();
  } else if(!req.query.q) {
    res.status(500).json({
      success: false,
      message: "'q' query param is mandatory"
    })
    res.end();
  } else {

    if(req.query.type === "user") {
      const users = await User.find({ email: { $regex: req.query.q } });
      res.json(users);

    } else {
      const mettas = await Metta.find({
        $and: [ 
          { $or: [{ title: { $regex: req.query.q } }, { description: { $regex: req.query.q } }] },
          { user: req.user.id }
        ]
      });
      res.json(mettas);
    }

  }


})

module.exports = router;