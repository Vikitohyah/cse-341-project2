const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const { route } = require('./swagger');
const validate = require('../middleware/students-validation')
const authenticate = require('../middleware/authenticate')

router.get('/', studentController.getAll);
router.get('/:id', studentController.getSingle);

router.post('/',
    authenticate.isAuthenticated,
    validate.createStudentRules(),
    validate.checkErrors,
    studentController.createStudents);

router.put('/:id',
    authenticate.isAuthenticated,
    validate.updateStudentRules(),
    validate.checkErrors,
    studentController.updateStudents);

router.delete('/:id',
    authenticate.isAuthenticated,
    studentController.deleteStudents)

module.exports = router;