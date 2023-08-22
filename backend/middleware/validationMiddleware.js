import { check, validationResult } from 'express-validator';



const validationRules = [
    check('name').isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
];


const validatonMiddleware = (req, res, next) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();


}

export {validationRules, validatonMiddleware}