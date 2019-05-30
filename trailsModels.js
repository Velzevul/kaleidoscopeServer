const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  trailId: {
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
  trailId: {
    type: String,
    index: true
  },
  q: String,
  url: String,
  timestamp: Date
}, { toJSON: { virtuals: true }});

querySchema.virtual('images', {
  ref: 'Image',
  localField: '_id',
  foreignField: 'queryId',
  options: {sort: {timestamp: -1}}
});

const trailSchema = new Schema({
  user: {
    type: String,
    index: true
  }
}, { toJSON: { virtuals: true } });

trailSchema.virtual('queries', {
  ref: 'Query',
  localField: '_id',
  foreignField: 'trailId'
});

module.exports = {
  Image: mongoose.model('Image', imageSchema),
  Query: mongoose.model('Query', querySchema),
  Trail: mongoose.model('Trail', trailSchema)
};