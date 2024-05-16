const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  auxilliary: {
    type: Number,
    required: true,
  },
  aggregate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('data', dataSchema);
