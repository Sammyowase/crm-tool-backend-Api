const ActivityLog = require('../models/activityLog');

// Get all activity logs
exports.getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate('user', 'name email');
    res.json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get activity log by ID
exports.getActivityLogById = async (req, res) => {
  try {
    const log = await ActivityLog.findById(req.params.id).populate('user', 'name email');
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
