import { AddressService } from '@address/interfaces/addressService.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { AddressDto } from '@address/dtos/address.dto';

export class AddressController {
	constructor(private service: AddressService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				userId,
				streetName,
				houseNumber,
				apartment,
				city,
				zipCode,
				region,
				country,
				active,
			} = req.body as AddressDto;

			const response = await this.service.create({
				userId,
				streetName,
				houseNumber,
				apartment,
				city,
				zipCode,
				region,
				country,
				active,
			});

			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}
