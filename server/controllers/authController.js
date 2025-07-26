import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User ({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.json('signup successful');
    } catch (error) {
        return next({ statusCode: 500, message: 'Error saving user', error });
    }
    
}