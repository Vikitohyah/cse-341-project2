const routes = require('express').Router();
const controller = require('../controllers')
const swagger = require('./swagger')
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

routes.use('/', swagger)

//routes.get('/', controller.helloWorld);

routes.use('/students', require('./students'));
routes.use('/courses', require('./courses'));

routes.get('/login', passport.authenticate('github'), (req, res) => {
    // Handle the login route
});

routes.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

module.exports = routes