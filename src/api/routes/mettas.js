const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAuth = require('../middlewares/isAuth');

const User = mongoose.model('User');
const Metta = mongoose.model('Metta');

router.get("/me/mettas", isAuth, async (req, res) => {
  try {

  User.findById(req.user.id)
  .populate({
  path: 'mettas',
  })
  .exec(function(err, result) {
    if(err){
      res.status(500).json({
        success: false,
        message: err.message
      })
    } else {
      res.json(result.mettas);
    }
  })

  } catch(err) {
    res.status(500).send({ message: err.message })
  }
});


router.post("/me/mettas", isAuth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id);

    const {
      guests,
      title,
      description,
      metta,
      amount,
    } = req.body;

    const mettaDoc = new Metta({
      user,
      title,
      description,
      metta,
      amount,
      guests
    })

    mettaDoc.save(function (err) {
      if(err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        user.mettas.push(mettaDoc.id);

        user.save(function (err) {
          if(err) {
            res.status(500).json({
              success: false,
              message: err.message
            })
          } else {
            res.status(200).json({
              success: true,
              message: "success"
            })
    }})}});

  } catch (err) {
    console.log(err.message)
    res.status(500).send(err.message);
  }
});


router.get("/mettas/:mettaId", isAuth, async (req, res) => {
  try {

   User.findById(req.user.id)
   .populate({
    path: 'mettas',
    match: { _id: req.params.mettaId },
    })
    .exec(function(err, result) {
      if(err){
        res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        res.json(result.mettas[0]);
      }
    })

  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.delete("/mettas/:mettaId", isAuth, async (req, res) => {
  try {

    Metta.findOneAndRemove({ _id: req.params.mettaId }, function (err, result) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        User.update(
          { "_id": req.user.id },
          { "$pull": { "mettas": req.params.mettaId } },
          function (err, result){
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message
              })
            } else {
              res.json(result);
            }
    })}});
    
  } catch (err) {
    res.status(500).send(err.message);
  }

});



module.exports = router;