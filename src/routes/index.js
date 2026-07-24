import { Router } from 'express';

import authRoutes from './auth.routes.js';
import studentRoutes from './student.routes.js';
import courseRoutes from './course.routes.js';
import moduleRoutes from './module.routes.js';
import lessonRoutes from './lesson.routes.js';
import activityRoutes from './activity.routes.js';
import instructorRoutes from './instructor.routes.js';
import adminRoutes from './admin.routes.js';
import supportRoutes from './support.routes.js';
import videoRoutes from './video.routes.js';

const router = Router();

router.use('/auth', authRoutes);

router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);
router.use('/modules', moduleRoutes);
router.use('/lessons', lessonRoutes);
router.use('/activities', activityRoutes);

router.use('/instructors', instructorRoutes);
router.use('/admin', adminRoutes);
router.use('/support', supportRoutes);
router.use('/videos', videoRoutes);

export default router;