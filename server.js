require('app-module-path').addPath(__dirname);
require('dotenv').config();
const mongoose = require('mongoose');


const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/api/v1');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then( () => {console.log("MongoDB connected") })
.catch( (err) => {console.log(err)});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/v1', apiRouter);

module.exports = app;
