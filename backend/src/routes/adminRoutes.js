const express = require('express');
const auth = require('../middleware/auth');
const { requireRole } = require('../middleware/role');
const {
  listStudents,
  admitStudent,
  listCallbacks,
  markCallbackHandled,
  listCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  listFaculty,
  createFaculty,
  updateFaculty,
  deleteFaculty,
  listResults,
  createResult,
  updateResult,
  deleteResult,
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes are protected and admin-only
router.use(auth, requireRole('admin'));

router.get('/students', listStudents);
router.patch('/students/:id/admit', admitStudent);

router.get('/callbacks', listCallbacks);
router.patch('/callbacks/:id/handled', markCallbackHandled);

router.get('/courses', listCourses);
router.post('/courses', createCourse);
router.patch('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);

router.get('/faculty', listFaculty);
router.post('/faculty', createFaculty);
router.patch('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);

router.get('/results', listResults);
router.post('/results', createResult);
router.patch('/results/:id', updateResult);
router.delete('/results/:id', deleteResult);

module.exports = router;

