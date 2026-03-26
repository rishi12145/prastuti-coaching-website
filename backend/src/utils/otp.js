const Otp = require('../models/Otp');

function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createAndStoreOtp(mobile) {
  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await Otp.create({ mobile, code, expiresAt });

  // In production, integrate with SMS provider here.
  console.log(`OTP for ${mobile}: ${code}`);

  return code;
}

async function verifyOtpCode(mobile, code) {
  const record = await Otp.findOne({ mobile, code, used: false });
  if (!record) return false;
  if (record.expiresAt < new Date()) return false;

  record.used = true;
  await record.save();
  return true;
}

module.exports = { createAndStoreOtp, verifyOtpCode };

