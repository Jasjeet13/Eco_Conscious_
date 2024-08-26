// module.exports = (req, res, next) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.status(400).send('Email and password are required');
//   }

//   next();
// };
const { body, validationResult } = require('express-validator');

// Middleware for validating login form data
const validateLogin = [
    // Validate email field
    body('email').isEmail().withMessage('Invalid email format'),
    
    // Validate password field
    body('password').notEmpty().withMessage('Password is required'),

    // Handle validation results
    (req, res, next) => {
        const errors = validationResult(req);
        // Collect any validation errors

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // If there are errors, return them as a JSON response

        next();
        // If no errors, proceed to the next middleware
    }
    // The actual middleware function
];

module.exports = validateLogin;
