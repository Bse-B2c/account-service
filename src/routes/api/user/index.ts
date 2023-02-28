import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { userController } from '@src/user';

// dtos
import { UserDto } from '@user/dtos/user.dto';
import { ParamsDto } from '@common/dtos/params.dto';

// validate
const validateBody = validate('body');
const validateParams = validate('params');

router.post('/', validateBody(UserDto), userController.create);
router.get('/:id', validateParams(ParamsDto), userController.findOne);
router.delete('/:id', validateParams(ParamsDto), userController.delete);

export default router;
