import { Router } from 'express';
import { register, login, logout } from '../controllers/user';
import { workspace } from '../controllers/workspace';
import { authMiddleware } from '../middlewares/authMiddleware';
import { registerMiddleware } from '../middlewares/register';

const router: Router = Router();

router.post('/login', login);
router.post('/register', registerMiddleware, register);
router.route('/workspace').get(authMiddleware, workspace);

export { router };
