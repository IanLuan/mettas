const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const transaction = require('./Transaction')

const MettaSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  guests: [{
    type: new Schema({ 
      _id: Schema.Types.ObjectId,
      name: String,
      picture: String,
      email: String
    }),
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

  transactions: [transaction],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Metta", MettaSchema);