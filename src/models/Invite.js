const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InviteSchema = new Schema({

  host: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  guest: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  metta: {
    type: Schema.Types.ObjectId,
    ref: 'Metta',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Invite", InviteSchema);