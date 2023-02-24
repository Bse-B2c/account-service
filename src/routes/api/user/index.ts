import { Router } from 'express';

const router = Router();

// controller
import { userController } from '@src/user';

router.get('/', userController.create);

export default router;
