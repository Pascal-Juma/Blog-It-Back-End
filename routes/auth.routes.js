import { Router } from 'express'
import validateUser from '../middleware/validateUser.js';
import passwordStrength from '../middleware/passwordStrength.js';
import { register, signin, getProfile, updateProfile } from '../controllers/auth.controller.js'
import validatePassword from '../middleware/validatePassword.js';

const router = Router();

router.route("/myprofile").get([getProfile]).patch([validateUser, validatePassword, passwordStrength, updateProfile]);

router.route("/register").post([validateUser, passwordStrength, register]);

router.route("/signin").post(signin);

export default router;