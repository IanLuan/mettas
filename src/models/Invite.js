const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InviteSchema = new Schema({

  host: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  guest: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  metta: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Invite", InviteSchema);