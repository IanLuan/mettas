const mongoose = require('mongoose');

const Metta = mongoose.model('Metta');

module.exports = {
 

  async store(req, res) {
    const metta = await Metta.create(req.body);

    return res.json(metta);
  },

  async show(req, res) {
    const metta = await Metta.findById(req.params.id);

    return res.json(metta);
  },

  async update(req, res) {
    const metta = await Metta.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(metta);
  },

  async destroy(req, res) {
    await Metta.findByIdAndDelete(req.params.id);

    return res.send();
  }
};