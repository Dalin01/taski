import { Router } from 'express';
// import { addTask, getTasks, editTask } from '../controllers/tasks';
// import { register, login } from '../controllers/user';
// import {
//   getWorkspaces,
//   postWorkspace,
//   getMembers,
//   addMember,
// } from '../controllers/workspace';

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
  .route('/taskspace/:taskspace')
  .delete(deleteTaskspace)
  .put(editTaskspace);

// Members routes
router
  .route('/members/:taskspace/:id')
  .get(getMembers)
  .post(addMember)
  .delete(deleteMember);
// router.route('/members/:taskspace/:id').delete(deleteMember);

// Tasks routes
router.route('/tasks/:workspaceId').get(getTasks).post(addTask);
// router.route('/tasks/:taskspace/:id').put(editTask).delete(removeTask);

export { router };
