import {
	AuthService as Service,
	Token,
} from '@auth/interfaces/authService.interface';
import { AuthRequestDto } from '@auth/dtos/authRequest.dto';
import { UserService } from '@user/interfaces/userService.interface';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { PasswordUtils } from '@common/utils/password.utils';
import { sign } from 'jsonwebtoken';
import { Role } from '@common/enums/role.enum';

export class AuthService implements Service {
	constructor(
		private userService: UserService,
		private passwordUtils: PasswordUtils
	) {}

	signIn = async (
		{ email, password }: AuthRequestDto,
		role: Role
	): Promise<Token> => {
		const user = await this.userService.findByEmail(email, role);

		if (!user)
			throw new HttpException({
				statusCode: HttpStatusCode.BAD_REQUEST,
				message: 'E-mail or password incorrect',
			});

		if (!this.passwordUtils.compare(password, user.password))
			throw new HttpException({
				statusCode: HttpStatusCode.BAD_REQUEST,
				message: 'E-mail or password incorrect',
			});

		const token = sign(
			{ username: user.name, roles: user.roles },
			process.env['SECRET'] ?? 'secret',
			{
				expiresIn: process.env['EXPIRES'],
			}
		);

		return { token, refreshToken: '' };
	};
}
