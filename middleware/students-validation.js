const {body, validationResult} = require("express-validator")
const validate = {}

/*  **********************************
  *  Create Student Validation Rules
  * ********************************* */
validate.createStudentRules = () => {
  return [
    // First Name
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required."),

    // Last Name
    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required."),

    // Age
    body("age")
      .notEmpty()
      .withMessage("Age is required.")
      .isInt({ min: 10, max: 100 })
      .withMessage("Age must be a valid number between 10 and 100."),

    // Gender
    body("gender")
      .notEmpty()
      .withMessage("Gender is required.")
      .isIn(["Male", "Female"])
      .withMessage("Gender must be Male or Female."),

    // Email
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email.")
      .normalizeEmail(),

    // Course
    body("course")
      .trim()
      .notEmpty()
      .withMessage("Course is required."),

    // Level
    body("level")
      .notEmpty()
      .withMessage("Level is required.")
      .isInt({ min: 100, max: 500 })
      .withMessage("Level must be between 100 and 500."),

    // GPA
    body("gpa")
      .notEmpty()
      .withMessage("GPA is required.")
      .isFloat({ min: 0, max: 5 })
      .withMessage("GPA must be between 0 and 5."),

    // Date Joined
    body("dateJoined")
      .notEmpty()
      .withMessage("Date joined is required.")
      .isISO8601()
      .withMessage("Date must be valid (YYYY-MM-DD)."),
  ]
}

/*  **********************************
  *  Update Student Validation Rules
  * ********************************* */
validate.updateStudentRules = () => {
  return [
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("First name is required."),

    body("lastName")
      .trim()
      .notEmpty()
      .withMessage("Last name is required."),

    body("age")
      .notEmpty()
      .isInt({ min: 10, max: 100 })
      .withMessage("Enter a valid age."),

    body("gender")
      .notEmpty()
      .isIn(["Male", "Female"])
      .withMessage("Gender must be Male or Female."),

    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .withMessage("Valid email required."),

    body("course")
      .trim()
      .notEmpty()
      .withMessage("Course is required."),

    body("level")
      .notEmpty()
      .isInt({ min: 100, max: 500 })
      .withMessage("Enter a valid level."),

    body("gpa")
      .notEmpty()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Enter a valid GPA."),

    body("dateJoined")
      .notEmpty()
      .isISO8601()
      .withMessage("Enter a valid date."),
  ]
}

/*  **********************************
  * Check Errors from Validation Rules
  * ********************************* */
validate.checkErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

module.exports = validate