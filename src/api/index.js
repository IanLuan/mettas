const express = require('express');
const routes = express.Router();
const mettaRouter = require('./routes/mettas');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const inviteRouter = require('./routes/invites');
const searchRouter = require('./routes/search');

routes.use(mettaRouter);
routes.use('/auth', authRouter);
routes.use(userRouter);
routes.use(inviteRouter);
routes.use(searchRouter);


module.exports = routes;