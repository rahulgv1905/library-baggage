// server/models/depositModel.js

const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
  {
    // This creates a link to a document in the 'User' collection
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // This creates a link to a document in the 'Container' collection
    container: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Container',
    },
    depositTime: {
      type: Date,
      default: Date.now,
    },
    collectionTime: {
      type: Date,
      default: null, // Will be set when the bag is collected
    },
    status: {
      type: String,
      enum: ['deposited', 'collected'],
      default: 'deposited',
    },
    // This will store the unique ID we embed in the student's QR code
    depositQRCodeId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;