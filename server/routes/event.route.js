import express from 'express';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import eventCtrl from '../controllers/event.controller';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/events - Get list of events */
  .get(expressJwt({ secret: config.jwtSecret }), eventCtrl.list)

  /** POST /api/events - Create new event */
  .post(expressJwt({ secret: config.jwtSecret }), eventCtrl.create);

router.route('/:eventId')
  /** GET /api/events/:eventId - Get event */
  .get(eventCtrl.get)

  /** PUT /api/events/:eventId - Update event */
  .put(eventCtrl.update)

  /** DELETE /api/events/:eventId - Delete event */
  .delete(eventCtrl.remove);

/** Load event when API with eventId route parameter is hit */
router.param('eventId', eventCtrl.load);

export default router;
