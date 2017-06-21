import Student from '../models/student.model';

/**
 * Load student and append to req.
 */
function load(req, res, next, id) {
  Student.get(id)
    .then((student) => {
      req.student = student; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get student
 * @returns {Student}
 */
function get(req, res) {
  return res.json(req.student);
}

/**
 * Create new student
 * @property {string} req.body.studentname - The studentname of student.
 * @property {string} req.body.mobileNumber - The mobileNumber of student.
 * @returns {Student}
 */
function create(req, res, next) {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    class: req.body.class,
    course: req.body.course,
    registrationId: req.body.registrationId,
  });

  student.save()
    .then(savedStudent => res.json(savedStudent))
    .catch(e => {console.log(e); next(e)});
}

/**
 * Update existing student
 * @property {string} req.body.studentname - The studentname of student.
 * @property {string} req.body.mobileNumber - The mobileNumber of student.
 * @returns {Student}
 */
function update(req, res, next) {
  const student = req.student;
  student.studentname = req.body.studentname;
  student.mobileNumber = req.body.mobileNumber;

  student.save()
    .then(savedStudent => res.json(savedStudent))
    .catch(e => next(e));
}

/**
 * Get student list.
 * @property {number} req.query.skip - Number of students to be skipped.
 * @property {number} req.query.limit - Limit number of students to be returned.
 * @returns {Student[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Student.list({ limit, skip })
    .then(students => res.json(students))
    .catch(e => next(e));
}

/**
 * Delete student.
 * @returns {Student}
 */
function remove(req, res, next) {
  const student = req.student;
  student.remove()
    .then(deletedStudent => res.json(deletedStudent))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
