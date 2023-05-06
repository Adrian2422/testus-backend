import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
	let service: UsersService;
	let prisma: PrismaService;

	beforeEach(async () => {
		prisma = new PrismaService();
		service = new UsersService(prisma);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
