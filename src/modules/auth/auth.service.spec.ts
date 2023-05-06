import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
	let prismaService: PrismaService;
	let jwtService: JwtService;
	let userService: UsersService;
	let authService: AuthService;

	beforeEach(async () => {
		prismaService = new PrismaService();
		userService = new UsersService(prismaService);
		jwtService = new JwtService();
		authService = new AuthService(prismaService, userService, jwtService);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});
});
