import { Router } from 'express';
import { Role } from '@common/enums/role.enum';
import user from '@src/routes/api/user';
import address from '@src/routes/api/address';
import auth from '@src/routes/api/auth';
import token from '@src/routes/api/refreshToken';

const router = Router();

// middleware
import {
	ensureAuthenticated,
	verifyRoles,
} from '@middleware/ensureAuthenticated';

router.use('/auth', auth);
router.use('/user', user);
router.use(
	'/address',
	ensureAuthenticated,
	verifyRoles([Role.CONSUMER]),
	address
);
router.use('/token', token);

export default router;
