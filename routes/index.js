const routes = require('express').Router();
const controller = require('../controllers')
const swagger = require('./swagger')
const swaggerDocument = require('../swagger.json');

routes.use('/', swagger)

routes.get('/', controller.helloWorld);

routes.use('/students', require('./students'));
routes.use('/courses', require('./courses'));

module.exports = routes