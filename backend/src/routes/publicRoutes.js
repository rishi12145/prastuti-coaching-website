const express = require('express');
const {
  getHighlights,
  getCourses,
  getTrendingCourses,
  getTopPerformers,
  getFaculty,
  getTopRankers,
  registerStudent,
  createCallbackRequest,
} = require('../controllers/publicController');

const router = express.Router();

router.get('/highlights', getHighlights);
router.get('/courses', getCourses);
router.get('/courses/trending', getTrendingCourses);
router.get('/faculty', getFaculty);
router.get('/results/top', getTopPerformers);
router.get('/rankers/top', getTopRankers);
router.post('/register', registerStudent);
router.post('/callback', createCallbackRequest);

module.exports = router;

