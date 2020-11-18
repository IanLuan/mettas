const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MettaSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  guests: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: false,
  },

  metta: {
    type: Number,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Metta", MettaSchema);