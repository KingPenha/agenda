const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const {loginRequiredMiddleware} = require('./src/middlewares/middleware');

route.get('/', homeController.index);

route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

route.get('/contato', loginRequiredMiddleware, contatoController.index);
module.exports = route;

