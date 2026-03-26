const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');
const { route } = require('./swagger');
const validate = require('../middleware/students-validation')

router.get('/', studentController.getAll);
router.get('/:id', studentController.getSingle);

router.post('/',
    validate.createStudentRules(),
    validate.checkErrors,
    studentController.createStudents);

router.put('/:id',
    validate.updateStudentRules(),
    validate.checkErrors,
    studentController.updateStudents);

router.delete('/:id',
    studentController.deleteStudents)

module.exports = router;