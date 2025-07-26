import User from '../models/user-model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password || username.trim() === '' || email.trim() === '' || password.trim() === '') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User ({
        username,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
    } catch (error) {
        return res.status(500).json({ message: 'Error saving user', error });
    }

    await newUser.save();
    res.json('signup successful');
}