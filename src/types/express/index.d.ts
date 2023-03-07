import express from 'express';

declare global {
	namespace Express {
		interface Request {
			user?: { name: string; roles: Array<number> };
		}
	}
}
