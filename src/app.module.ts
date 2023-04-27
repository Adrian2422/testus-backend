import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';

@Module({
	imports: [ AuthModule, UsersModule ],
	controllers: [AppController],
	providers: [UsersService],
})
export class AppModule {}
