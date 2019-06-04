/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
  Schema,
} = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  teamlead: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  contacts: [{
    contact_name: {
      type: String,
      unique: true,
    },
    contact_value: {
      type: String,
    },
  },
  ],
  photoURL: {
    type: String,
  },
  hr: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    required: true,
  },
  dates: [{
    topic: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  ],
  reset_password_token: {
    type: String,
  },
  reset_password_expires: {
    type: Date,
  },
  watched_issues: [{
    type: Schema.Types.ObjectId,
    ref: 'Issue',
  },
  ],
  photoID: {
    type: String,
  },
  roles: [{
    type: String,
  },
  ],
});

function hashPassword(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    }
    this.password = hash;
    next();
  });
  return 1;
}

UserSchema.pre('save', hashPassword);

function checkPassword(passwordToCheck) {
  return bcrypt.compareSync(passwordToCheck, this.password);
}

UserSchema.methods.checkPassword = checkPassword;

UserSchema.set('toObject', {
  transform(doc, ret) {
    const object = ret;
    delete object.password;
    delete object.login;
    delete object.type;
    delete object.__v;
    return object;
  },
});

UserSchema.set('toJSON', {
  transform(doc, ret) {
    const object = ret;
    delete object.password;
    delete object.login;
    delete object.type;
    delete object.__v;
    return object;
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
