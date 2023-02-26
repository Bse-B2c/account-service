import { Router } from 'express';
import user from '@src/routes/api/user';
import address from '@src/routes/api/address';

const router = Router();

router.use('/user', user);
router.use('/address', address);

export default router;
