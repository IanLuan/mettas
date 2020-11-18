const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  googleId: {
    type: String,
    unique: true
  },

  mettas: [{
    type: Schema.Types.ObjectId,
    ref: 'Metta'
  }],

  invites: [{
    type: Schema.Types.ObjectId,
    ref: 'Invite'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("User", MettaSchema);