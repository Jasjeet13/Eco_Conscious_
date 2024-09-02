const { body, validationResult } = require('express-validator');
// express-validator : library use to check if the data sent to our server meets certain rule
// example - email given by the user is actually an email or not

// body : it helps to target a certain field from our form and than apply rules on it  
// validationResult : checks if there are any validation error when the request was processed

const validateSignup = [
    body('username').notEmpty().withMessage('Username is required'),
    // body function targets the username field and apply rule .notMessage which checks if the input is empty or not
    // If the username field is empty it applies the message present in .withMessage


    body('fullname').notEmpty().withMessage('Full name is required'),

    body('email').isEmail().withMessage('Invalid email format'),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('confirmPassword').custom((value, { req }) => value === req.body.password).withMessage('Passwords must match'),
    // .custom : helps in creating custom rules
    // value : password entered in the Reenter password 
    // req is the object which contains all submitted data of the form
    // from the req object we will take out the value of password entered in the field Password


    body('address').notEmpty().withMessage('Address is required'),

    body('phoneNumber').isMobilePhone().withMessage('Invalid phone number'),

    (req, res, next) => {
        const errors = validationResult(req);
        // collects the validation error which might be found 

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // if error are found the array of error is send back as response

        next();
        // if no error is found control is passedto next middleware
        
    }
    // this part is the actual middleware function 
    // req : submitted form data
    // res : answer we will send back
    // next : function which passes control to the next middleware
];

module.exports = validateSignup;
