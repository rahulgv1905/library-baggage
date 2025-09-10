// server/controllers/containerController.js

const Container = require('../models/containerModel');
const qrcode = require('qrcode');
const jwt = require('jsonwebtoken');

// @desc    Generate a temporary QR code for a student to scan
// @route   POST /api/admin/generate-qr
// @access  Private/Admin
const generateInitialQRCode = async (req, res) => {
    const { containerNumber } = req.body;

    if (!containerNumber) {
        return res.status(400).json({ message: 'Container number is required' });
    }

    try {
        // Find or create the container. 'upsert: true' creates it if it doesn't exist.
        let container = await Container.findOneAndUpdate(
            { containerNumber: containerNumber.toUpperCase() },
            { $setOnInsert: { containerNumber: containerNumber.toUpperCase(), isAvailable: true } },
            { new: true, upsert: true }
        );

        // Check if the container is available
        if (!container.isAvailable) {
            return res.status(400).json({ message: 'Container is already in use' });
        }

        // Mark the container as unavailable for the deposit process
        container.isAvailable = false;
        await container.save();

        // Create a temporary token containing the container's ID.
        // This token is what gets embedded in the QR code.
        const tempToken = jwt.sign({ containerId: container._id }, process.env.JWT_SECRET, {
            expiresIn: '5m', // This token is valid for only 5 minutes
        });

        // Generate the QR code as a Data URL
        const qrCodeDataURL = await qrcode.toDataURL(tempToken);

        res.json({
            message: 'Scan this QR code to proceed with deposit.',
            qrCode: qrCodeDataURL,
            containerNumber: container.containerNumber,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { generateInitialQRCode };