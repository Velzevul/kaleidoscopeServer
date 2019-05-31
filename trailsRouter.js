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
      populate: {
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
          .then(t => {
            res.json({
              success: true,
              data: {
                tail: t
              }
            });
          });
      }
    });
});

trailsRouter.post('/:user/queries', (req, res) => {
  const user = req.params.user;

  Trail.findOne({user})
    .then(trail => {
      if (trail) {
        const query = new Query(Object.assign({}, req.body.query, {
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

trailsRouter.get('/:user/queries/search', (req, res) => {
  const user = req.params.user;

  Trail.findOne({user})
    .populate({
      path: 'queries'
    })
    .then(trail => {
      if (trail) {
        trail.queries.find({q: decodeURI(req.query.q)})
          .populate({
            path: 'images'
          })
          .then(queries => {
            res.json({
              success: true,
              data: {
                queries
              }
            });
          });
      } else {
        notFound(res, `cannot find trail for ${user}`);
      }
    });
});

trailsRouter.post('/:user/queries/:queryId/images', (req, res) => {
  const queryId = req.params.queryId;

  Query.findById(queryId)
    .then(query => {
      if (query) {
        const image = new Image(Object.assign({}, req.body.image, {
          queryId: query._id,
          trailId: query.trailId,
          timestamp: Date.now()
        }));

        image.save()
          .then(image => {
            res.json({
              success: true,
              data: {
                image
              }
            });
          });
      } else {
        notFound(res, `cannot find query with id ${queryId}`);
      }
    })
});

module.exports = trailsRouter;