const express = require('express');
const mettaRouter = express.Router();
const mongoose = require('mongoose');

const Metta = mongoose.model('Metta');

mettaRouter.get('/', async (req, res) => {
  const mettas = await Metta.find();
  return res.json(mettas);
});

module.exports = mettaRouter;