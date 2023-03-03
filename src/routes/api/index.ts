import { Router } from 'express';
import user from '@src/routes/api/user';
import address from '@src/routes/api/address';
import auth from '@src/routes/api/auth';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/address', address);

export default router;
