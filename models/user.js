const mongoose = require('mongoose');
const { Schema } = mongoose;
const { EMAIL_VALIDATION_SCHEMA } = require('./../utils/validationSchemas');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: value => EMAIL_VALIDATION_SCHEMA.isValidSync(value),
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unknown'],
    default: 'unknown',
  },
  birthday: {
    type: Date,
    validate: {
      validator: date => new Date(date) < new Date(),
    },
  },
  isMerried: {
    type: Boolean,
    default: false,
  },
  workExperience: {
    type: Number,
    min: 0,
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
