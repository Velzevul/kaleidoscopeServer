const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  trail: {
    type: Schema.Types.ObjectId,
    ref: 'Trail'
  },
  query: {
    type: Schema.Types.ObjectId,
    ref: 'Query'
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
  trail: {
    type: Schema.Types.ObjectId,
    ref: 'Trail'
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image'
  }],
  q: String,
  url: String,
  timestamp: Date
});

const trailSchema = new Schema({
  user: {
    type: String,
    index: true
  },
  queries: [{
    type: Schema.Types.ObjectId,
    ref: 'Query'
  }]
});

module.exports = {
  Image: mongoose.model('Image', imageSchema),
  Query: mongoose.model('Query', querySchema),
  Trail: mongoose.model('Trail', trailSchema)
};