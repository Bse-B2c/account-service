import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { UserService } from '@user/interfaces/userService.interface';
import { CreateUserDto } from '@user/dtos/user.dto';
import { SearchDto } from '@user/dtos/search.dto';

export class UserController {
	constructor(private service: UserService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, email, password, phone, cpf, brithDate } =
				req.body as CreateUserDto;

			const response = await this.service.create({
				name,
				email,
				password,
				phone,
				cpf,
				brithDate,
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

	updateMe = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				body: { name, email, phone, cpf, brithDate },
				user,
			} = req;
			const id = user ? user.id : -1;

			const response = await this.service.update(id, {
				name,
				email,
				phone,
				cpf,
				brithDate,
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

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				body: { name, email, phone, cpf, brithDate },
				params: { id },
			} = req;

			const response = await this.service.update(+id, {
				name,
				email,
				phone,
				cpf,
				brithDate,
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

	me = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.user?.id;

			if (!id)
				throw new HttpException({
					statusCode: HttpStatusCode.UNAUTHORIZED,
					message: 'Token invalid',
				});

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
				orderBy: orderBy ?? 'name',
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
}
