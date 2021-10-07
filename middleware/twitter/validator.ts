import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const validateTwitter = () => [
    check('username').notEmpty().withMessage('Missing twitter username')
];

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validationResult(req).throw();
        next();
    }
    catch (e) {
        const errors = validationResult(req).array();
        res.status(400).json(errors);
    }
}