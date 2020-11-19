const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Metta = mongoose.model('Metta');

router.get('/', async (req, res) => {
  const mettas = await Metta.find();
  return res.json(mettas);
});

module.exports = router;