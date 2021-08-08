import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { registerMiddleware } from '../middlewares/register.middleware';

import { login } from '../controllers/login.controller';
import { register } from '../controllers/register.controller';
import { getTaskspace } from '../controllers/getTaskspace.controller';
import { postTaskspace } from '../controllers/postTaskspace.controller';
import { editTaskspace } from '../controllers/editTaskspace.controller';
import { deleteTaskspace } from '../controllers/deleteTaskspace.controller';
import { getMembers } from '../controllers/getMembers.controller';
import { addMember } from '../controllers/addMember.controller';
import { deleteMember } from '../controllers/removeMember.controller';
import { getTasks } from '../controllers/getTasks.controller';
import { addTask } from '../controllers/postTasks.controller';
import { editTask } from '../controllers/editTask.controller';
import { removeTask } from '../controllers/removeTask.controller';

const router: Router = Router();

// Public routes
router.post('/login', login);
router.post('/register', registerMiddleware, register);

router.use(authMiddleware);

// Private routes
// Taskspaces routes
router.route('/taskspace').get(getTaskspace).post(postTaskspace);
router
  .route('/taskspace/:taskspace')
  .delete(deleteTaskspace)
  .put(editTaskspace);

// Members routes
router.route('/members/:taskspace/:id').get(getMembers).post(addMember);

router.route('/members/:taskspace/:id/:memberId').delete(deleteMember);

// Tasks routes
router.route('/tasks/:workspaceId').get(getTasks).post(addTask);
router.route('/tasks/:taskspace/:id').put(editTask).delete(removeTask);

export { router };
