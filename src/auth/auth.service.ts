import { AuthService as Service } from '@auth/interfaces/authService.interface';
import { AuthRequestDto } from '@auth/dtos/authRequest.dto';
import { UserService } from '@user/interfaces/userService.interface';
import { HttpException, HttpStatusCode } from '@bse-b2c/common';
import { PasswordUtils } from '@common/utils/password.utils';
import { Role } from '@common/enums/role.enum';
import { RefreshTokenService } from '@src/refreshToken/interfaces/refreshTokenService';
import { Token } from '@common/interfaces/token';

export class AuthService implements Service {
	constructor(
		private userService: UserService,
		private refreshTokenService: RefreshTokenService,
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

		const token = this.refreshTokenService.generateToken(
			{ username: user.name, id: user.id, roles: user.roles },
			{
				secret: process.env['SECRET'] ?? 'secret',
				expiresIn: process.env['EXPIRES'] as string,
			}
		);

		await this.refreshTokenService.deleteMany(user.id);

		const refreshToken = await this.refreshTokenService.create(user);

		return { token, refreshToken };
	};
}
