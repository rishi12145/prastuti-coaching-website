const User = require('../models/User');

async function getMe(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-passwordHash');
    if (!user || user.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getMe };

