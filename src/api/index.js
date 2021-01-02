const express = require('express');
const routes = express.Router();
const mettaRouter = require('./routes/mettas');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const inviteRouter = require('./routes/invites');

routes.use(mettaRouter);
routes.use('/auth', authRouter);
routes.use(userRouter);
routes.use(inviteRouter);


module.exports = routes;