const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TransactionSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  metta: {
    type: Schema.Types.ObjectId,
    ref: 'Metta'
  },

  value: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Transaction", TransactionSchema);