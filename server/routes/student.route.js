import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import studentCtrl from '../controllers/student.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/students - Get list of students */
  .get(expressJwt({ secret: config.jwtSecret }), studentCtrl.list)

  /** POST /api/students - Create new student */
  .post(expressJwt({ secret: config.jwtSecret }), studentCtrl.create);

router.route('/:studentId')
  /** GET /api/students/:studentId - Get student */
  .get(studentCtrl.get)

  /** PUT /api/students/:studentId - Update student */
  .put(studentCtrl.update)

  /** DELETE /api/students/:studentId - Delete student */
  .delete(studentCtrl.remove);

/** Load student when API with studentId route parameter is hit */
router.param('studentId', studentCtrl.load);

export default router;
