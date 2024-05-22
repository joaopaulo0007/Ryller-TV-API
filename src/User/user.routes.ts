import { getProfile, login, register } from "./userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const express = require('express'); 

const router = express.Router(); 

router.post('/user/register', register);
router.post('/user/login', login);

router.use(authMiddleware); 

router.get('/user/profile', getProfile);


export default router;