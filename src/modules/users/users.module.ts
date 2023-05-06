import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
	imports: [PrismaModule],
	exports: [UsersService],
	controllers: [UsersController],
	providers: [
		UsersService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class UsersModule {}
