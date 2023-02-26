import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { userController } from '@src/user';

// dtos
import { UserDto } from '@user/dtos/user.dto';

// validate
const validateBody = validate('body');

router.post('/', validateBody(UserDto), userController.create);

export default router;
