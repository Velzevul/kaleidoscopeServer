const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  uname: {
    type: String,
    index: true
  },
  queryId: {
    type: String,
    index: true
  },
  thumbSrc: {
    type: String,
    index: true
  },
  src: String,
  url: String,
  height: Number,
  width: Number,
  timestamp: Date,
});

const querySchema = new Schema({
  uname: {
    type: String,
    index: true
  },
  q: String,
  url: String,
  timestamp: Date
});

const userSchema = new Schema({
  uname: {
    type: String,
    index: true
  },
});

module.exports = {
  Image: mongoose.model('Image', imageSchema),
  Query: mongoose.model('Query', querySchema),
  User: mongoose.model('User', userSchema)
};