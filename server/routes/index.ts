import { Router } from 'express';
import { register, login, logout } from '../controllers/user';
import {
  getWorkspaces,
  postWorkspace,
  getWorkspace,
} from '../controllers/workspace';
import { authMiddleware } from '../middlewares/authMiddleware';
import { registerMiddleware } from '../middlewares/register';

const router: Router = Router();

router.post('/login', login);
router.post('/register', registerMiddleware, register);

router.post('/workspaces', authMiddleware, getWorkspaces);
router.post('/workspace', authMiddleware, postWorkspace);

router.get('/workspace/:id/:name', authMiddleware, getWorkspace);

export { router };
