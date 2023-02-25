import { DataSource } from 'typeorm';

export class PostgresDB {
	async connect(): Promise<void> {
		try {
			const postgresDataSource = new DataSource({
				type: 'postgres',
				host: process.env['TYPEORM_HOST'] ?? 'localhost',
				port: Number(process.env['TYPEORM_PORT']) || 5432,
				username: process.env['TYPEORM_USERNAME'],
				password: process.env['TYPEORM_PASSWORD'],
				database: process.env['TYPEORM_DATABASE'],
				entities: [],
				synchronize: true,
			});

			await postgresDataSource.initialize();
		} catch (e) {
			console.error('Error during Data Source initialization', e);
		}
	}
}
