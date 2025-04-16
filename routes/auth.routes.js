import { Router } from 'express'
import validateUser from '../middleware/validateUser.js';
import passwordStrength from '../middleware/passwordStrength.js';
import { register, signin, getProfile, updateProfile } from '../controllers/auth.controller.js'
import validatePassword from '../middleware/validatePassword.js';
import VerifyUser from '../middleware/verifyUser.js';

const router = Router();

router.route("/myprofile").get([VerifyUser, getProfile]).patch([VerifyUser, validateUser, validatePassword, passwordStrength, updateProfile]);

router.route("/register").post([validateUser, passwordStrength, register]);

router.route("/signin").post(signin);

export default router;