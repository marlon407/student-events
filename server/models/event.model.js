import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Event Schema
 */
const EventSchema = new mongoose.Schema({
  professor: {
    type: String,
    required: true
  },
  student: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  class: {
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
EventSchema.method({
});

/**
 * Statics
 */
EventSchema.statics = {
  /**
   * Get event
   * @param {ObjectId} id - The objectId of event.
   * @returns {Promise<Event, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((event) => {
        if (event) {
          return event;
        }
        const err = new APIError('No such event exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List events in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of events to be skipped.
   * @param {number} limit - Limit number of events to be returned.
   * @returns {Promise<Event[]>}
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
 * @typedef Event
 */
export default mongoose.model('Event', EventSchema);
