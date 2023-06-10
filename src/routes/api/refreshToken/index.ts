import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
import { RefreshDto } from '@refreshToken/dtos/refresh.dto';

const router = Router();

// Controller
import { refreshTokenController } from '@src/refreshToken';

// validate
const validateBody = validate('body');

router.post(
	'/refresh',
	validateBody(RefreshDto),
	refreshTokenController.handle
);

export default router;
