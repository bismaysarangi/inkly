import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user-route.js';
import authRoute from './routes/auth-route.js';
import postRoute from './routes/post-route.js';
import commentRoute from './routes/comment-route.js';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => { console.log("Connected to MongoDB") })
    .catch(err => { console.error("MongoDB connection error:", err) });

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/server/user', userRoute);
app.use('/server/auth', authRoute);
app.use('/server/post', postRoute);
app.use('/server/comment', commentRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success: false,
        statusCode,
        message: message 
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});