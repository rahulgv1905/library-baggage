// server/models/containerModel.js

const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
  containerNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    default: true, // New containers are available by default
  },
});

const Container = mongoose.model('Container', containerSchema);

module.exports = Container;