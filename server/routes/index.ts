import { Router } from 'express';
// import { addTask } from '../controllers/tasks';
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

router.post('/workspaces', authMiddleware, getWorkspaces); // get all workspaces
router.post('/workspace', authMiddleware, postWorkspace); // create

router.post('/getMembers', authMiddleware, getMembers);
router.put('/addMember', authMiddleware, addMember);

// router.post('/addTask', authMiddleware, addTask);

export { router };
