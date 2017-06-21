import Event from '../models/event.model';

/**
 * Load event and append to req.
 */
function load(req, res, next, id) {
  Event.get(id)
    .then((event) => {
      req.event = event; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get event
 * @returns {Event}
 */
function get(req, res) {
  return res.json(req.event);
}

/**
 * Create new event
 * @property {string} req.body.eventname - The eventname of event.
 * @property {string} req.body.mobileNumber - The mobileNumber of event.
 * @returns {Event}
 */
function create(req, res, next) {
  const event = new Event({
    professor: req.body.professor,
    student: req.body.student,
    subject: req.body.subject,
    description: req.body.description,
    class: req.body.class,
    registrationId: req.body.registrationId,
  });

  event.save()
    .then(savedEvent => res.json(savedEvent))
    .catch(e => {console.log(e); next(e)});
}

/**
 * Update existing event
 * @property {string} req.body.eventname - The eventname of event.
 * @property {string} req.body.mobileNumber - The mobileNumber of event.
 * @returns {Event}
 */
function update(req, res, next) {
  const event = req.event;
  event.eventname = req.body.eventname;
  event.mobileNumber = req.body.mobileNumber;

  event.save()
    .then(savedEvent => res.json(savedEvent))
    .catch(e => next(e));
}

/**
 * Get event list.
 * @property {number} req.query.skip - Number of events to be skipped.
 * @property {number} req.query.limit - Limit number of events to be returned.
 * @returns {Event[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Event.list({ limit, skip })
    .then(events => res.json(events))
    .catch(e => next(e));
}

/**
 * Delete event.
 * @returns {Event}
 */
function remove(req, res, next) {
  const event = req.event;
  event.remove()
    .then(deletedEvent => res.json(deletedEvent))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
