const express = require('express');
const {Image} = require('./trailsModels');

const notFound = (res, msg) => {
  res.status(404)
    .json({
      success: false,
      data: {
        msg
      }
    });
};

const imagesRouter = express.Router();

imagesRouter.get('/', (req, res) => {
  Image.find()
    .then(images => {
      res.json({
        success: true,
        data: {
          images
        }
      })
    });
});

module.exports = imagesRouter;