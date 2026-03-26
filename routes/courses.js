const express = require('express');
const router = express.Router();

const coursesController = require('../controllers/courses');
const { route } = require('./swagger');
const validate = require('../middleware/courses-validation')

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);

router.post('/',
    validate.createCourseRules(),
    validate.checkErrors,
    coursesController.createCourses)

router.put('/:id',
    validate.updateCourseRules(),
    validate.checkErrors,
    coursesController.updateCourses)

router.delete('/:id',
    coursesController.deleteCourses)

module.exports = router;