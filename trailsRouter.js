const express = require('express');
const {Query, Image, User} = require('./trailsModels');

const router = express.Router();

router.get('/', (req, res) => {
  User.find()
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

  User.findOne({uname})
    .then(user => {
      if (user) {
        Query.find({uname})
          .then(queries => {
            const imageQueries = [];

            queries.forEach(query => {
              imageQueries.push(Image.find({queryId: query.id}));
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
        user = new User({uname});

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

module.exports = router;