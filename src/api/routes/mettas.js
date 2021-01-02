const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const isAuth = require('../middlewares/isAuth');
let ObjectId = mongoose.Types.ObjectId; 


const User = mongoose.model('User');
const Metta = mongoose.model('Metta');
const Transaction = mongoose.model('Transaction')

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
    res.status(500).json({
      success: false,
      message: err.message
    })
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
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


router.put("/mettas/:mettaId", isAuth, async (req, res) => {
  try {
    delete req.body._id;

    const metta = await Metta.findById(req.params.mettaId);

    // alterar para liberar update feito pelos guests
    if(metta.user == req.user.id) {
      metta.updateOne(
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
    } else {
      res.status(500).json({
        success: false,
        message: "Not authorized",
      })
    }

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


router.delete("/mettas/:mettaId", isAuth, async (req, res) => {
  try {
    const metta = await Metta.findById(req.params.mettaId);

    if(metta.user == req.user.id) {
      Metta.findOneAndRemove({ _id: req.params.mettaId }, function (err, result) {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message
          })
        } else {
          User.updateOne(
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
            }
          )
        }});
    } else {
      res.status(500).json({
        success: false,
        message: "Not authorized",
      })
    }
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


// TRANSACTIONS ENDPOINTS


router.get("/mettas/:mettaId/transactions", isAuth, async (req, res) => {
  try {
    const metta = await Metta.findById(req.params.mettaId);

    // TODO restrict this action to user and guests only
    res.json(metta.transactions);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


router.post("/mettas/:mettaId/transactions", isAuth, async (req, res) => {
  try {
    const metta = await Metta.findById(req.params.mettaId);

    // TODO restrict this action to user and guests only
    const userDoc = await User.findById(metta.user);

    const user = {
      _id: userDoc.id,
      name: userDoc.name,
      picture: userDoc.picture,
      email: userDoc.email
    }

    const value = req.body.value;

    const transaction = new Transaction({
      user,
      value
    })

    metta.updateOne(
      { "$push": { "transactions": transaction }, 'amount': metta.amount + value },
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

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

router.get("/mettas/:mettaId/transactions/:transactionId", isAuth, async (req, res) => {
  try {
    const metta = await Metta.findById(req.params.mettaId);

    // TODO restrict this action to user and guests only
    const transactions = metta.transactions.filter(element => element._id == req.params.transactionId);
    
    res.json(transactions[0]);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});


router.delete("/mettas/:mettaId/transactions/:transactionId", isAuth, async (req, res) => {
  try {
    const metta = await Metta.findById(req.params.mettaId);
    
    // TODO restrict this action to metta creator or transaction creator

    const transaction = metta.transactions.filter(element => element._id == req.params.transactionId)[0];
    const value = transaction.value;

    metta.updateOne(
      { 
        "$pull": { "transactions": { "_id": new ObjectId(req.params.transactionId) } },
        "amount": metta.amount - value
      },
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

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
});



module.exports = router;