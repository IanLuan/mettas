const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TransactionSchema = new Schema({

  user: {
    _id: Schema.Types.ObjectId,
    name: String,
    picture: String,
    email: String
  },

  metta: {
    type: Schema.Types.ObjectId,
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