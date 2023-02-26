import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { UserService } from '@user/interfaces/userService.interface';
import { UserDto } from '@user/dtos/user.dto';

export class UserController {
	constructor(private service: UserService) {}

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name, email, password, phone, cpf, brithDate } =
				req.body as UserDto;

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
}
