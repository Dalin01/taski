import { Router } from 'express';
import { addTask, getTasks, editTask } from '../controllers/tasks';
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

// router.post('/login', login);
// router.post('/register', registerMiddleware, register);
// router.get('/taskspaces', authMiddleware, getWorkspaces);
// router.post('/taskspace', authMiddleware, postWorkspace);
// router.post('/getMembers', authMiddleware, getMembers);
// router.put('/addMember', authMiddleware, addMember);
// router.post('/addTask', authMiddleware, addTask);
// router.post('/getTasks', authMiddleware, getTasks);
// router.put('/editTask', authMiddleware, editTask);

// Public routes
router.post('/login', login);
router.post('/register', registerMiddleware, register);

router.use(authMiddleware);

// Private routes
// Taskspaces routes
router.route('/taskspace').get(getTaskspace).post(postTaskspace);
router
  .route('/taskspace/:id/:taskspace')
  .delete(deleteTaskspace)
  .put(deleteTaskspace);

// Members routes
router.route('/members/:taskspace').get(getMembers).post(addMember);
router.route('/members/:taskspace/:id').delete(removeMember);

// Tasks routes
router.route('/tasks/:taskspace').get(getTasks).post(postTask);
router.route('/tasks/:taskspace/:id').put(editTask).delete(removeTask);

export { router };
