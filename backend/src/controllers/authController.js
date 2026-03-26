const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const { createAndStoreOtp, verifyOtpCode } = require('../utils/otp');

const ADMIN_MOBILES = new Set(['9434932182', '9679727696']);

function normalizeMobile(raw) {
  return String(raw || '').replace(/\D/g, '').slice(-10);
}

// OTP login (students + admin allowlist)
async function sendOtp(req, res) {
  try {
    const { mobile, requestedRole } = req.body;
    const m = normalizeMobile(mobile);
    if (!m) {
      return res.status(400).json({ message: 'Mobile is required' });
    }

    const isAdminMobile = ADMIN_MOBILES.has(m);

    // For admin mobiles, require explicit role selection before sending OTP
    if (isAdminMobile && !requestedRole) {
      return res.json({
        requiresRoleSelection: true,
        allowedRoles: ['admin', 'student'],
      });
    }

    const role = requestedRole === 'admin' ? 'admin' : 'student';

    if (role === 'admin') {
      if (!isAdminMobile) {
        return res.status(403).json({ message: 'Not allowed to login as admin' });
      }
      const admin = await User.findOne({ mobile: m, role: 'admin' });
      if (!admin) {
        await User.create({
          name: 'Admin',
          mobile: m,
          role: 'admin',
          status: 'admitted',
          loginEnabled: true,
        });
      }
    } else {
      const user = await User.findOne({ mobile: m, role: 'student', loginEnabled: true });
      if (!user) {
        return res.status(404).json({ message: 'Student not found or login not enabled' });
      }
    }

    await createAndStoreOtp(m);
    res.json({ message: 'OTP sent (logged in server console in dev)', requiresRoleSelection: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function verifyOtp(req, res) {
  try {
    const { mobile, code, requestedRole } = req.body;
    const m = normalizeMobile(mobile);
    if (!m || !code) {
      return res.status(400).json({ message: 'Mobile and code are required' });
    }

    const ok = await verifyOtpCode(m, code);
    if (!ok) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const isAdminMobile = ADMIN_MOBILES.has(m);
    const role = requestedRole === 'admin' ? 'admin' : 'student';

    let user = null;

    if (role === 'admin') {
      if (!isAdminMobile) {
        return res.status(403).json({ message: 'Not allowed to login as admin' });
      }
      user = await User.findOne({ mobile: m, role: 'admin', loginEnabled: true });
      if (!user) {
        user = await User.create({
          name: 'Admin',
          mobile: m,
          role: 'admin',
          status: 'admitted',
          loginEnabled: true,
        });
      }
    } else {
      user = await User.findOne({ mobile: m, role: 'student', loginEnabled: true });
      if (!user) {
        return res.status(404).json({ message: 'Student not found or login not enabled' });
      }
    }

    const token = signToken({ id: user._id, role: user.role });
    res.json({ token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { sendOtp, verifyOtp };

