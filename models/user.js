const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hasProfile: {
    type: Boolean,
    required: false,
    default: false,
  },
  online: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true,
});

module.exports = model("User", userSchema);
