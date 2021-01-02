const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const invite = require('./Invite');

const UserSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  picture: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  mettas: [{
    type: Schema.Types.ObjectId,
    ref: 'Metta',
  }],

  invites: [invite],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);