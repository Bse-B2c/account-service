import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';
import { AuthService } from '@auth/interfaces/authService.interface';
import { AuthRequestDto } from '@auth/dtos/authRequest.dto';

export class AuthController {
	constructor(private service: AuthService) {}

	signIn = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body as unknown as AuthRequestDto;

			const response = await this.service.signIn({ password, email });

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
