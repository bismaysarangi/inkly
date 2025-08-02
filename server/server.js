import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user-route.js';
import authRoute from './routes/auth-route.js';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => { console.log("Connected to MongoDB") })
    .catch(err => { console.error("MongoDB connection error:", err) });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.use(express.json());
app.use('/server/user', userRoute);
app.use('/server/auth', authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        message: message 
    });
});
