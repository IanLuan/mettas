const express = require('express');
const routes = express.Router();
const mettaRouter = require('./routes/mettas');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

routes.use('/mettas', mettaRouter);
routes.use('/auth', authRouter);
routes.use('/users', userRouter);

module.exports = routes;