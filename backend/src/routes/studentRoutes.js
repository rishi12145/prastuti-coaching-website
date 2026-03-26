const express = require('express');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const { getMe } = require('../controllers/studentController');

const router = express.Router();

router.use(auth, requireRole('student'));

router.get('/me', getMe);

module.exports = router;

