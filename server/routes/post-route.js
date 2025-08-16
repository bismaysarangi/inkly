import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletePost, getPosts, updatePost, likePost } from '../controllers/postController.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.get('/getposts', getPosts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put('/updatepost/:postId/:userId', verifyToken, updatePost);
router.put('/likepost/:postId', verifyToken, likePost);

export default router;