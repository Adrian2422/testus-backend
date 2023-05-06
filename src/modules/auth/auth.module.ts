import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
	imports: [
		PrismaModule,
		UsersModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_ACCESS_SECRET,
			signOptions: { expiresIn: '60s' }
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class AuthModule {}
