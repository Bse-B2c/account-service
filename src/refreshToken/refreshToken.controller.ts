import { RefreshTokenService } from '@src/refreshToken/interfaces/refreshTokenService';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';

export class RefreshTokenController {
	constructor(private service: RefreshTokenService) {}

	handle = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.body;

			const response = await this.service.handle(refreshToken);

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
