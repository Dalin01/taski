import { Router } from 'express';
import { addTask, getTasks } from '../controllers/tasks';
import { register, login } from '../controllers/user';
import {
  getWorkspaces,
  postWorkspace,
  getMembers,
  addMember,
} from '../controllers/workspace';
import { authMiddleware } from '../middlewares/authMiddleware';
import { registerMiddleware } from '../middlewares/register';

const router: Router = Router();

router.post('/login', login);
router.post('/register', registerMiddleware, register);

router.post('/workspaces', authMiddleware, getWorkspaces); // to refactor to GET
router.post('/workspace', authMiddleware, postWorkspace); // create

router.post('/getMembers', authMiddleware, getMembers); // to refactor to GET
router.put('/addMember', authMiddleware, addMember);

router.post('/addTask', authMiddleware, addTask);
router.post('/getTasks', authMiddleware, getTasks); // to refactor to GET

export { router };
