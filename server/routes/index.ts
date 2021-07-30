import { Router } from 'express';
import { register, login, logout } from '../controllers/user';
import { getWorkspace, postWorkspace } from '../controllers/workspace';
import { authMiddleware } from '../middlewares/authMiddleware';
import { registerMiddleware } from '../middlewares/register';

const router: Router = Router();

router.post('/login', login);
router.post('/register', registerMiddleware, register);
router.post('/workspaces', authMiddleware, getWorkspace);
router.post('/workspace', authMiddleware, postWorkspace);

export { router };
