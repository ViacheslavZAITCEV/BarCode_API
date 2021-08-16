import { BadRequestException, Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_REGISTRED_USER } from './auth.constatnts';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: AuthModel) {
		const oldUser = await this.authService.findUser(dto.login)
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTRED_USER)
		}
		return this.authService.createUser(dto);
	}


	@Post('login')
	async login(@Body() dto: AuthModel) {
		console.warn('Rout without loginque!!!')
		const user = this.authService.findUser(dto.login);

		return null
	}


	@Post('update')
	async update(@Body() dtodto: Omit<AuthModel, '_id'>) {

	}

	@Get('test')
	@HttpCode(200)
	async test() {
		return 'route GET: .../api/auth/test'
	}

}
