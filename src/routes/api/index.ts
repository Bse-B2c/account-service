import { Router } from 'express';
import user from '@src/routes/api/user';

const router = Router();

router.use('/user', user);

export default router;
