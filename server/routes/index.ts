import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/login');
router.post('/register');

router.route('/channels').get().post();
router.route('/channels/:id').delete().put();

export default router;
