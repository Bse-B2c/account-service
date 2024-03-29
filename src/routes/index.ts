import { Router } from 'express';
import api from '@src/routes/api';

const router = Router();

router.use('/api/account', api);

export { router };
