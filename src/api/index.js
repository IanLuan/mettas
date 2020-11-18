const express = require('express');
const routes = express.Router();
const mettaRouter = require('./routes/mettas');

routes.use('/mettas', mettaRouter);

module.exports = routes;