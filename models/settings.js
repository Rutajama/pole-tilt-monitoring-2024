const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  minAngle: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model('settings', settingsSchema);
