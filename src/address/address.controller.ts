import { AddressService } from '@address/interfaces/addressService.interface';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { AddressDto } from '@address/dtos/address.dto';
import { SearchDto } from '@address/dtos/search.dto';

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

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				body,
				params: { id },
			} = req;

			const response = await this.service.update(+id, body);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	setActiveAddress = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params;

			const response = await this.service.setActiveAddress(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	findOne = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.findOne(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	find = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { orderBy, sortOrder, limit, page, ...search } =
				req.query as unknown as SearchDto;

			const response = await this.service.find({
				...search,
				orderBy: orderBy ?? 'streetName',
				sortOrder: sortOrder ?? 'ASC',
				limit: limit || 10,
				page: page || 0,
			});

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const response = await this.service.delete(+id);

			return res.status(HttpStatusCode.OK).send({
				statusCode: HttpStatusCode.OK,
				error: null,
				data: response,
			});
		} catch (e) {
			next(e);
		}
	};
}
