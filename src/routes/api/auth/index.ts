import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';

const router = Router();

// Controller
import { authController } from '@src/auth';
import { AuthRequestDto } from '@auth/dtos/authRequest.dto';

// validate
const validateBody = validate('body');

router.post('/signin', validateBody(AuthRequestDto), authController.signIn);
router.post(
	'/admin/signin',
	validateBody(AuthRequestDto),
	authController.signInAdmin
);

export default router;
