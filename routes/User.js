import express from 'express';
import { signupController, signinController, forgotPasswordController, resetPasswordController } from '../controllers/user.js'; 

const router = express.Router();

// signup 
router.post('/signup', signupController );

// signin
router.post('/signin', signinController );

// forgot password
router.post('/forgot' , forgotPasswordController);

// reset password
router.post('/reset/:token', resetPasswordController);


export default router;