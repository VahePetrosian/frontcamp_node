const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: { type: String, required: true, trim: true },
  name: { type: String, trim: true },
  surname: { type: String, trim: true },
  hash: { type: String },
  salt: { type: String },
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

module.exports = mongoose.model('Users', UsersSchema);
