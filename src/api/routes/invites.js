const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAuth = require('../middlewares/isAuth');
let ObjectId = mongoose.Types.ObjectId; 

const User = mongoose.model('User');
const Metta = mongoose.model('Metta');
const Invite = mongoose.model('Invite');

router.get("/me/invites", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.invites);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

router.post("/invites/:mettaId/:guestId", isAuth, async (req,res) => {
  try {

    const mettaDoc = await Metta.findById(req.params.mettaId);
    const hostDoc = await User.findById(req.user.id);
    const guestDoc = await User.findById(req.params.guestId);

    if(mettaDoc.user == req.user.id) {

      if (guestDoc.invites.some(invite => invite.metta._id == req.params.mettaId)) {
        res.status(500).json({
          success: false,
          message: "The guest already has this invite."
        })

      } else if (guestDoc.mettas.includes(req.params.mettaId)) {
        res.status(500).json({
          success: false,
          message: "The guest already participates in the metta."
        })
      } else {

        const metta = {
          _id: mettaDoc._id,
          title: mettaDoc.title,
          description: mettaDoc.description,
          metta: mettaDoc.metta
        }

        const host = {
          _id: hostDoc._id,
          name: hostDoc.name,
          picture: hostDoc.picture,
          email: hostDoc.email
        }

        const guest = req.params.guestId;

        const invite = new Invite({
          host,
          metta,
          guest
        });

        guestDoc.updateOne(
          { "$push": { "invites": invite }},
          function (err, result){
            if (err) {
              res.status(500).json({
                success: false,
                message: err.message,
              })
            } else {
              res.json(result);
            }
          }
        );
      }
    } else {
      res.status(500).json({
        success: false,
        message: "Not authorized"
      })
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


router.post("/invites/:inviteId", isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const invite = user.invites.filter(element => element._id == req.params.inviteId)[0];
    const metta = await Metta.findById(invite.metta._id);

    user.updateOne(
      { "$push": { "mettas": metta._id }, "$pull": {"invites": { "_id": new ObjectId(req.params.inviteId)} }  },
      function (err, result){
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          })
        } else {
          const guest = {
            _id: user._id,
            name: user.name,
            picture: user.picture,
            email: user.email
          }

          metta.updateOne(
            { "$push": { "guests": guest } },
            function (err, result){
              if (err) {
                res.status(500).json({
                  success: false,
                  message: err.message,
                })
              } else {
                res.json(result);
              }
          });
        }
      });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


router.delete("/invites/:inviteId", isAuth, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.updateOne(
    { "$pull": {"invites": { "_id": new ObjectId(req.params.inviteId)} }  },
    function (err, result){
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      } else {
        res.json(result);
      }
  });
});

module.exports = router;