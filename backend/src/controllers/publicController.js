const User = require('../models/User');
const Course = require('../models/Course');
const Faculty = require('../models/Faculty');
const Result = require('../models/Result');
const CallbackRequest = require('../models/CallbackRequest');

// Homepage stats
async function getHighlights(req, res) {
  try {
    const [totalStudents, admittedStudents, facultyCount] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'student', status: 'admitted' }),
      Faculty.countDocuments(),
    ]);

    res.json({
      yearsOfExperience: 10, // static for now
      totalStudents,
      successfulResults: admittedStudents,
      expertFaculty: facultyCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getTrendingCourses(req, res) {
  try {
    const courses = await Course.find({ isTrending: true }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getTopPerformers(req, res) {
  try {
    const results = await Result.find().sort({ createdAt: -1 }).limit(24);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getFaculty(req, res) {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.json(faculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getTopRankers(req, res) {
  try {
    const rankers = await Result.find({ isTopper: true })
      .sort({ createdAt: -1 })
      .limit(24);
    res.json(rankers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Registration form submission
async function registerStudent(req, res) {
  try {
    const {
      name,
      studentMobile,
      parentMobile,
      email,
      courseInterested,
      classOrExam,
      address,
    } = req.body;

    if (!name || !studentMobile || !courseInterested || !classOrExam) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ mobile: studentMobile, role: 'student' });
    if (existing) {
      return res.status(409).json({ message: 'Student already registered' });
    }

    await User.create({
      name,
      mobile: studentMobile,
      parentMobile,
      email,
      courseInterested,
      classOrExam,
      address,
      role: 'student',
      status: 'registered',
    });

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Callback request
async function createCallbackRequest(req, res) {
  try {
    const { name, mobile, courseInterested } = req.body;
    if (!name || !mobile) {
      return res.status(400).json({ message: 'Name and mobile are required' });
    }

    await CallbackRequest.create({ name, mobile, courseInterested });
    res.status(201).json({ message: 'Callback request submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getHighlights,
  getCourses,
  getTrendingCourses,
  getTopPerformers,
  getFaculty,
  getTopRankers,
  registerStudent,
  createCallbackRequest,
};

