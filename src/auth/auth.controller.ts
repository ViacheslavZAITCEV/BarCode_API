import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private readonly AuthService: AuthService) { }

	@Post('create')
	async create(@Body() dto: Omit<AuthModel, '_id'>) {
		console.log('route POST: .../api/auth/create')

	}


	@Post('login')
	async login(@Body() dto: Omit<AuthModel, '_id'>) {

	}


	@Post('update')
	async update(@Body() dtodto: Omit<AuthModel, '_id'>) {

	}

	@Get('test')
	async test(@Body() dtodto: Omit<AuthModel, '_id'>) {
		console.log('route GET: .../api/auth/test')
		return 'route GET: .../api/auth/test'
	}

}
