const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Result = require('../models/Result');
const CallbackRequest = require('../models/CallbackRequest');

// Seed an initial admin if none exists (called at startup)
async function ensureDefaultAdmin() {
  const existing = await User.findOne({ role: 'admin' });
  if (existing) return;
  const passwordHash = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD || 'admin123', 10);
  await User.create({
    name: 'Super Admin',
    mobile: process.env.DEFAULT_ADMIN_MOBILE || '9999999999',
    passwordHash,
    role: 'admin',
    status: 'admitted',
    loginEnabled: true,
  });
  console.log('Default admin created with mobile DEFAULT_ADMIN_MOBILE and password DEFAULT_ADMIN_PASSWORD');
}

// Students
async function listStudents(req, res) {
  try {
    const { status } = req.query;
    const query = { role: 'student' };
    if (status) query.status = status;
    const students = await User.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function admitStudent(req, res) {
  try {
    const { id } = req.params;
    const { rollNumber, stream, batch, admissionDate, feeStatus, loginEnabled } = req.body;

    const student = await User.findById(id);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.rollNumber = rollNumber || student.rollNumber;
    student.stream = stream || student.stream;
    student.batch = batch || student.batch;
    student.admissionDate = admissionDate || student.admissionDate || new Date();
    student.feeStatus = feeStatus || student.feeStatus;
    student.status = 'admitted';
    student.loginEnabled = typeof loginEnabled === 'boolean' ? loginEnabled : true;

    await student.save();
    res.json({ message: 'Admission updated', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Callback requests
async function listCallbacks(req, res) {
  try {
    const callbacks = await CallbackRequest.find().sort({ createdAt: -1 });
    res.json(callbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function markCallbackHandled(req, res) {
  try {
    const { id } = req.params;
    const callback = await CallbackRequest.findByIdAndUpdate(id, { handled: true }, { new: true });
    if (!callback) return res.status(404).json({ message: 'Callback not found' });
    res.json(callback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Courses
async function listCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createCourse(req, res) {
  try {
    const { name, description, classOrExam, duration, fee, imageUrl, isTrending, newBatchTag } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const course = await Course.create({
      name,
      description,
      classOrExam,
      duration,
      fee,
      imageUrl,
      isTrending: !!isTrending,
      newBatchTag,
    });
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Faculty
async function listFaculty(req, res) {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createFaculty(req, res) {
  try {
    const { name, subject, experienceYears, photoUrl, bio } = req.body;
    if (!name || !subject) return res.status(400).json({ message: 'Name and subject required' });
    const faculty = await Faculty.create({
      name,
      subject,
      experienceYears,
      photoUrl,
      bio,
    });
    res.status(201).json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateFaculty(req, res) {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndUpdate(id, req.body, { new: true });
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteFaculty(req, res) {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) return res.status(404).json({ message: 'Faculty not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Results
async function listResults(req, res) {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createResult(req, res) {
  try {
    const { studentName, course, achievement, rankAchieved, stream, isTopper, photoUrl } = req.body;
    if (!studentName) return res.status(400).json({ message: 'Student name required' });
    const result = await Result.create({
      studentName,
      course,
      achievement,
      rankAchieved,
      stream,
      isTopper: !!isTopper,
      photoUrl,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateResult(req, res) {
  try {
    const { id } = req.params;
    const result = await Result.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteResult(req, res) {
  try {
    const { id } = req.params;
    const result = await Result.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  ensureDefaultAdmin,
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
};

