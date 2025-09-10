// server/controllers/depositController.js

const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const qrcode = require('qrcode');
const Deposit = require('../models/depositModel');
const Container = require('../models/containerModel');
const User = require('../models/userModel');

// @desc    Finalize a baggage deposit
// @route   POST /api/student/finalize-deposit
// @access  Private/Student
const finalizeDeposit = async (req, res) => {
  const { tempToken, mobile } = req.body;
  const studentId = req.user._id; // Get student ID from our 'protect' middleware

  if (!tempToken || !mobile) {
    return res.status(400).json({ message: 'Missing temporary token or mobile number' });
  }

  try {
    // 1. Verify the temporary token from the admin's QR code
    const decoded = jwt.verify(tempToken, process.env.JWT_SECRET);
    const { containerId } = decoded;

    // 2. Check if the container is still marked as unavailable (as it should be)
    const container = await Container.findById(containerId);
    if (!container || container.isAvailable) {
      return res.status(400).json({ message: 'Invalid or expired container session' });
    }

    // 3. Update the student's mobile number in their user profile
    await User.findByIdAndUpdate(studentId, { mobile });

    // 4. Generate a new, permanent, and unique ID for the final QR code
    const depositQRCodeId = uuidv4();

    // 5. Create the final deposit record in the database
    const deposit = await Deposit.create({
      student: studentId,
      container: containerId,
      depositQRCodeId: depositQRCodeId,
    });

    // 6. Generate the final QR code image for the student
    const finalQRCode = await qrcode.toDataURL(depositQRCodeId);

    res.status(201).json({
      message: 'Deposit successful! Show this QR code to collect your baggage.',
      depositDetails: deposit,
      qrCode: finalQRCode,
    });

  } catch (error) {
    // Handle expired token error specifically
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'The QR code has expired. Please ask the admin to generate a new one.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- APPENDED CHANGES START HERE ---

// @desc    Collect baggage by scanning student's QR code
// @route   POST /api/admin/collect-baggage
// @access  Private/Admin
const collectBaggage = async (req, res) => {
  const { depositQRCodeId } = req.body; // This ID comes from the student's QR code

  if (!depositQRCodeId) {
    return res.status(400).json({ message: 'Deposit QR Code ID is required' });
  }

  try {
    // 1. Find the deposit using the unique ID from the QR code
    // We use .populate() to automatically fetch the related student and container details
    const deposit = await Deposit.findOne({ depositQRCodeId: depositQRCodeId })
      .populate('student', 'name email mobile') // Get name, email, mobile from the User collection
      .populate('container', 'containerNumber');   // Get containerNumber from the Container collection

    // 2. Check if the deposit exists
    if (!deposit) {
      return res.status(404).json({ message: 'Deposit not found. Invalid QR code.' });
    }

    // 3. Check if the bag has already been collected
    if (deposit.status === 'collected') {
      return res.status(400).json({
        message: 'This bag has already been collected.',
        depositDetails: deposit,
      });
    }

    // 4. Update the deposit status
    deposit.status = 'collected';
    deposit.collectionTime = Date.now();
    await deposit.save();

    // 5. Make the container available again
    await Container.findByIdAndUpdate(deposit.container._id, { isAvailable: true });

    // 6. Send the details back to the admin for verification
    res.json({
      message: 'Collection successful. Please return the bag to the student.',
      depositDetails: deposit,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Updated to export both functions
module.exports = { finalizeDeposit, collectBaggage };