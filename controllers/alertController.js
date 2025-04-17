const Alert = require('../models/Alert');

exports.addAlert = async (req, res) => {
    const {
        userId,
        symbol,
        threshold,
        limit,
        windowHours,
        windowMinutes
    } = req.body;

    const windowMs = (typeof windowMinutes === 'number'
        ? windowMinutes * 60 * 1000
        : windowHours * 3600 * 1000
    );

    const alert = new Alert({ userId, symbol, threshold, limit, windowMs });
    await alert.save();
    res.status(201).json({ message: 'Alert registered', alert });
};
