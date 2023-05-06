import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersController', () => {
	let controller: UsersController;
	let prismaService: PrismaService;
	let userService: UsersService;

	beforeEach(async () => {
		userService = new UsersService(prismaService);
		controller = new UsersController(userService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
