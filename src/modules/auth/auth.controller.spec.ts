import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
	let controller: AuthController;
	let prismaService: PrismaService;
	let userService: UsersService;
	let jwtService: JwtService;
	let authService: AuthService;

	beforeEach(async () => {
		prismaService = new PrismaService();
		jwtService = new JwtService();
		userService = new UsersService(prismaService);
		authService = new AuthService(prismaService, userService, jwtService);
		controller = new AuthController(authService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
