const Stock = require('../models/stock');
const Alert = require('../models/Alert');
const { scheduleSummary } = require('../utils/rateLimiter');

exports.addStock = async (req, res) => {
    const { symbol, price } = req.body;
    const stock = new Stock({ symbol, price });
    await stock.save();
    res.status(201).json({ message: 'Stock added', stock });
};

exports.updatePrice = async (req, res) => {
    const { symbol, price } = req.body;
    const stock = await Stock.findOneAndUpdate(
        { symbol }, { price }, { new: true }
    );
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    const alerts = await Alert.find({ symbol });
    const now = Date.now();

    for (let alert of alerts) {
        if (price <= alert.threshold) continue;

        if (!alert.windowEnd) {
            alert.windowEnd = new Date(now + alert.windowMs);
            scheduleSummary(alert);
        }

        alert.sentTimestamps = alert.sentTimestamps.filter(ts =>
            ts.getTime() > now - alert.windowMs
        );

        if (alert.sentTimestamps.length < alert.limit) {
            console.log(`Alert ${alert.userId}: ${symbol} > ${alert.threshold}`);
            alert.sentTimestamps.push(new Date(now));
        } else {
            alert.missedCount += 1;
        }
        await alert.save();
    }

    res.json({ message: 'Price updated, alerts processed', stock });
};
