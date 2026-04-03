const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { route } = require('./swagger');
const validate = require('../middleware/courses-validation')
const authenticate = require('../middleware/authenticate')

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);

router.post('/',
    authenticate.isAuthenticated,
    validate.createCourseRules(),
    validate.checkErrors,
    coursesController.createCourses)

router.put('/:id',
    authenticate.isAuthenticated,
    validate.updateCourseRules(),
    validate.checkErrors,
    coursesController.updateCourses)

router.delete('/:id',
    authenticate.isAuthenticated,
    coursesController.deleteCourses)

module.exports = router;