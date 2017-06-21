import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Student Schema
 */
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  registrationId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
StudentSchema.method({
});

/**
 * Statics
 */
StudentSchema.statics = {
  /**
   * Get student
   * @param {ObjectId} id - The objectId of student.
   * @returns {Promise<Student, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((student) => {
        if (student) {
          return student;
        }
        const err = new APIError('No such student exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List students in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of students to be skipped.
   * @param {number} limit - Limit number of students to be returned.
   * @returns {Promise<Student[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Student
 */
export default mongoose.model('Student', StudentSchema);
