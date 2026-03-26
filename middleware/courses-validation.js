const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Create Course Validation Rules
  * ********************************* */
validate.createCourseRules = () => {
  return [
    // Course Code (e.g., CSE101)
    body("courseCode")
      .trim()
      .notEmpty()
      .withMessage("Course code is required.")
      .matches(/^[A-Z]{3}\d{3}$/)
      .withMessage("Course code must have the format CSE101."),

    // Course Name
    body("courseName")
      .trim()
      .notEmpty()
      .withMessage("Course name is required."),

    // Credit Units (number)
    body("creditUnits")
      .notEmpty()
      .withMessage("Credit units are required.")
      .isInt({ min: 1, max: 6 })
      .withMessage("Credit units must be between 1 and 6."),

    // Lecturer
    body("lecturer")
      .trim()
      .notEmpty()
      .withMessage("Lecturer name is required."),

    // Department
    body("department")
      .trim()
      .notEmpty()
      .withMessage("Department is required."),
  ]
}

/*  **********************************
  *  Update Course Validation Rules
  * ********************************* */
validate.updateCourseRules = () => {
  return [
    body("courseCode")
      .trim()
      .notEmpty()
      .matches(/^[A-Z]{3}\d{3}$/)
      .withMessage("Invalid course code."),

    body("courseName")
      .trim()
      .notEmpty()
      .withMessage("Course name is required."),

    body("creditUnits")
      .notEmpty()
      .isInt({ min: 1, max: 6 })
      .withMessage("Enter valid credit units."),

    body("lecturer")
      .trim()
      .notEmpty()
      .withMessage("Lecturer is required."),

    body("department")
      .trim()
      .notEmpty()
      .withMessage("Department is required."),
  ]
}

/*  **********************************
  *  Check Errors from Validation Rules
  * ********************************* */
validate.checkErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

module.exports = validate