const express = require('express');
const models = require('./trailsModels');

const router = express.Router();

router.get('/', (req, res) => {
  models.User.find()
    .then(users => {
      res.json({
        success: true,
        data: {
          users
        }
      })
    });
});

router.get('/:uname', (req, res) => {
  const uname = req.params.uname;

  models.User.findOne({uname})
    .then(user => {
      if (user) {
        models.Queries.find({uname})
          .then(queries => {
            const imageQueries = [];

            queries.forEach(query => {
              imageQueries.push(models.Images.find({queryId: query.id}));
            });

            Promise.all(imageQueries)
              .then(queryImages => {
                for (let i = 0; i < queries.length; ++i) {
                  queries[i].images = queryImages[i];
                }

                res.json({
                  success: true,
                  user: Object.assign({}, user, {
                    queries
                  })
                });
              });
          });
      } else {
        user = new models.User({uname});

        user.save()
          .then(user => {
            res.json({
              success: true,
              data: {
                user: Object.assign({}, user, {
                  queries: []
                })
              }
            });
          });
      }
    });
});