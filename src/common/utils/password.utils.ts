import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export class PasswordUtils {
	generate = (password: string): string => {
		const salt = genSaltSync(10);

		return hashSync(password, salt);
	};

	compare = (password: string, hash: string): boolean =>
		compareSync(password, hash);
}
