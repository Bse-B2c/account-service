import { Router } from 'express';
import { validate } from '@common/utils/validate.utils';
const router = Router();

// controller
import { addressController } from '@src/address';

// dto
import { AddressDto } from '@address/dtos/address.dto';
import { ParamsDto } from '@common/dtos/params.dto';
import { SearchDto } from '@address/dtos/search.dto';
import { UpdateAddressDto } from '@address/dtos/updateAddress.dto';

// Validate
const validateBody = validate('body');
const validateParams = validate('params');
const validateQuery = validate('query');

router.post('/', validateBody(AddressDto), addressController.create);
router.get('/:id', validateParams(ParamsDto), addressController.findOne);
router.delete('/:id', validateParams(ParamsDto), addressController.delete);
router.get('/', validateQuery(SearchDto), addressController.find);
router.put(
	'/:id',
	validateParams(ParamsDto),
	validateBody(UpdateAddressDto),
	addressController.update
);

export default router;
