import * as studentService from '../services/student.service.js';

export const getDashboard = async (req, res) => {
  try {
    const data = await studentService.getDashboard(req.user.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const data = await studentService.getMyCourses(req.user.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const data = await studentService.getCourseProgress(req.user.id, req.params.courseId);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = await studentService.updateProfile(req.user.id, req.body);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const enroll = async (req, res) => {
  try {
    const data = await studentService.enroll(req.user.id, req.body.courseId);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const cancelEnrollment = async (req, res) => {
  try {
    await studentService.cancelEnrollment(req.user.id, req.params.courseId);
    return res.status(200).json({ message: "Matrícula cancelada." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const reviewCourse = async (req, res) => {
  try {
    const data = await studentService.reviewCourse(req.user.id, req.body);
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
