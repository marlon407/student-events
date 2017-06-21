import express from 'express';
import userRoutes from './user.route';
import studentRoutes from './student.route';
import eventRoutes from './event.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount student routes at /auth
router.use('/students', studentRoutes);

// mount event routes at /events
router.use('/events', eventRoutes);

export default router;