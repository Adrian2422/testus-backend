import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
	let jwtService: JwtService;
	let reflector: Reflector;

	beforeEach(() => {
		jwtService = new JwtService();
		reflector = new Reflector();
	});

	it('should be defined', () => {
		expect(new AuthGuard(jwtService, reflector)).toBeDefined();
	});
});
