const Alert = require('../models/Alert');

function scheduleSummary(alert) {
  const id = alert._id.toString();
  const delay = alert.windowEnd.getTime() - Date.now();
  if (delay <= 0) return;

  setTimeout(async () => {
    try {
      const latest = await Alert.findById(id);
      if (!latest) return;

      if (latest.missedCount > 0) {
        console.log(
          `Alert ${latest.userId}: you missed ${latest.missedCount} alerts for ${latest.symbol}`
        );
      }

      await Alert.updateOne(
        { _id: id },
        {
          $set: {
            sentTimestamps: [],
            missedCount:      0,
            windowEnd:        null
          }
        }
      );
    } catch (err) {
      console.error('Error in scheduled summary:', err);
    }
  }, delay);
}

module.exports = { scheduleSummary };
