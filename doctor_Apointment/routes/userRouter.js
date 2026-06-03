import express from 'express';
import { getAllUsers, getLoginUser, getStats, getUserDetails, updatePassword, updateUser, userLogin, userRegister } from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import { isAdmin, userAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
// register -> post 
router.post('/register', userRegister);

// login -> post
router.post('/login', userLogin);

// update profile -> patch
router.patch('/update/:id', userAuth ,upload.single('Image'),updateUser);
// update password ->patch
router.patch('/update-password/:id', userAuth ,updatePassword);

// get all users ->get
router.get('/get-all', userAuth ,isAdmin,getAllUsers);


/// get user details  -> get
router.get('/get-user/:id', userAuth ,isAdmin,getUserDetails);


/// get all stats
router.get('/get-stats', userAuth ,isAdmin,getStats);

// get login user details
router.get('/get-login-user/:id', userAuth ,getLoginUser);



export default router;