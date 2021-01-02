const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const requireDir = require('require-dir');
//const firebaseAdmin = require('./api/')
require("dotenv-safe").config();

// Iniciando App
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Iniciando DB
mongoose.connect(
  'mongodb://localhost:27017/nodeapi', 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);

requireDir('./models');

const routes = require("./api/index");
app.use(routes);

app.listen(3001);