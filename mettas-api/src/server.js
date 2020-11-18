const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');
const requireDir = require('require-dir');

// Iniciando App
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando DB
mongoose.connect(
  'mongodb://localhost:27017/nodeapi', 
  { useNewUrlParser: true, useUnifiedTopology: true }
);

requireDir('./src/app/models');

app.use('/mettas-api', require('./routes'));

app.listen(3001);