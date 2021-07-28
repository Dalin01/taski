import { Router } from 'express';
import { register, login } from '../controllers/user';
import { registerMiddleware } from '../middlewares/register';

const router: Router = Router();

router.post('/login', login);
router.post('/register', registerMiddleware, register);

export { router };
