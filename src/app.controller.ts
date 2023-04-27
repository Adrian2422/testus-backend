import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('api')
export class AppController {
	constructor() {}

	@ApiExcludeEndpoint()
	@Get()
	index() {
		return 'Welcome to Testus api!';
	}
}
