import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '@bse-b2c/common';

export class UserController {
	create = (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.status(HttpStatusCode.CREATED).send({
				statusCode: HttpStatusCode.CREATED,
				error: null,
				data: {},
			});
		} catch (e) {
			next(e);
		}
	};
}
