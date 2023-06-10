import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
import { Role } from '@common/enums/role.enum';
const router = Router();

// controller
import { userController } from '@src/user';

// dtos
import { CreateUserDto, UserDto } from '@user/dtos/user.dto';
import { ParamsDto } from '@common/dtos/params.dto';
import { SearchDto } from '@user/dtos/search.dto';

// middleware
import {
	ensureAuthenticated,
	verifyRoles,
} from '@middleware/ensureAuthenticated';

// validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(CreateUserDto), userController.create);
router.get(
	'/',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN]),
	validateQuery(SearchDto),
	userController.find
);
router.get(
	'/me',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN, Role.CONSUMER]),
	userController.me
);
router.patch(
	'/me',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER, Role.ADMIN]),
	validateBody(UserDto),
	userController.updateMe
);
router.get(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN, Role.CONSUMER]),
	validateParams(ParamsDto),
	userController.findOne
);
router.delete(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN, Role.CONSUMER]),
	validateParams(ParamsDto),
	userController.delete
);
router.patch(
	'/:id',
	ensureAuthenticated,
	verifyRoles([Role.ADMIN]),
	validateBody(UserDto),
	userController.update
);

export default router;
