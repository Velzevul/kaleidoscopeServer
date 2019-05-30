const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const trailsRouter = require('./trailsRouter');

var port = process.env.KALEIDOSCOPE_SERVER_PORT || 3001;
mongoose.connect(`mongodb://${process.env.KALEIDOSCOPE_SERVER_DB_USER}:${process.env.KALEIDOSCOPE_SERVER_DB_PASS}@${process.env.KALEIDOSCOPE_SERVER_DB_HOST}/${process.env.KALEIDOSCOPE_SERVER_DB_NAME}`);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS');
  res.header('Allow', 'GET, HEAD, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get(`${process.env.KALEIDOSCOPE_SERVER_API_PREFIX}/`, (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'working'
    }
  });
});

app.use(`${process.env.KALEIDOSCOPE_SERVER_API_PREFIX}/trails`, trailsRouter);

app.listen(port);