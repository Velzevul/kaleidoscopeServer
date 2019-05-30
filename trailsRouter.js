const express = require('express');
const {Query, Image, Trail} = require('./trailsModels');

const notFound = (res, msg) => {
  res.status(404)
    .json({
      success: false,
      data: {
        msg
      }
    });
};

const trailsRouter = express.Router();

trailsRouter.get('/', (req, res) => {
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
        data: {
          trails
        }
      })
    });
});

trailsRouter.get('/:user', (req, res) => {
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
              data: {
                trail
              }
            });
          });
      }
    });
});

trailsRouter.post('/:user/queries', (req, res) => {
  const user = req.params.user;

  Trail.findOne({user})
    then(trail => {
      if (trail) {
        const query = Query.create(Object.assign({}, req.body.query, {
          trailId: trail._id,
          timestamp: Date.now()
        }));

        query.save()
          .then(query => {
            res.json({
              success: true,
              data: {
                query
              }
            });
          });
      } else {
        notFound(res, `cannot find trail for ${user}`);
      }
    });
});

trailsRouter.post('/:user/queries/:queryId/images', (req, res) => {

});

module.exports = trailsRouter;