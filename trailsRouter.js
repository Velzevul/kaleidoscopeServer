const express = require('express');
const {Query, Image, Trail} = require('./trailsModels');

const router = express.Router();

router.get('/', (req, res) => {
  Trail.find()
    .populate({
      path: 'queries',
      populate: {
        path: 'images'
      }
    })
    .then(trails => {
      res.json({
        success: true,
        data: trails
      })
    });
});

router.get('/:user', (req, res) => {
  const user = req.params.user;

  Trail.findOne({user})
    .populate({
      path: 'queries',
      popuate: {
        path: 'images'
      }
    })
    .then(trail => {
      if (trail) {
        res.json({
          success: true,
          data: trail
        });
      } else {
        trail = new Trail({user});

        trail.save()
          .then(trail => {
            res.json({
              success: true,
              data: trail
            });
          });
      }
    });
});

module.exports = router;