const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const InviteSchema = new Schema({

  host: {
    type: new Schema({ 
      _id: Schema.Types.ObjectId,
      name: String,
      picture: String,
      email: String
    }),
    required: true
  },

  guest: {
    type: Schema.Types.ObjectId,
    required: true
  },

  metta: {
    type: new Schema({ 
      _id: Schema.Types.ObjectId,
      title: String,
      description: String,
      metta: String,
    }),
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Invite", InviteSchema);