import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '@user/entity/user.entity';
import { Address } from '@address/entity/address.entity';
import { RefreshToken } from '@src/refreshToken/entity/refreshToken.entity';

dotenv.config();

export const dataSource = new DataSource({
	type: 'postgres',
	host: process.env['TYPEORM_HOST'] ?? 'localhost',
	port: Number(process.env['TYPEORM_PORT']) || 5432,
	username: process.env['TYPEORM_USERNAME'],
	password: process.env['TYPEORM_PASSWORD'],
	database: process.env['TYPEORM_DATABASE'],
	entities: [User, Address, RefreshToken],
	synchronize: true,
});

class PostgresDB {
	constructor(private dataSource: DataSource) {}

	async connect(): Promise<void> {
		try {
			await this.dataSource.initialize();
		} catch (e) {
			console.error('Error during Data Source initialization', e);
		}
	}
}

export default new PostgresDB(dataSource);
