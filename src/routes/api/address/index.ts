import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { addressController } from '@src/address';

// dto
import { AddressDto } from '@address/dtos/address.dto';

// Validate
const validateBody = validate('body');

router.post('/', validateBody(AddressDto), addressController.create);

export default router;
