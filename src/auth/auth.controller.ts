import { BadRequestException, Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_REGISTRED_USER } from './auth.constatnts';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: UserModel) {
		const oldUser = await this.authService.findUser(dto.login)
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTRED_USER)
		}
		return this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: UserModel) {
		const user = await this.authService.validateUser(dto.login, dto.password);
		return this.authService.login(user.login)
	}


	@Post('update')
	async update(@Body() dtodto: Omit<UserModel, '_id'>) {

	}

	@Get('test')
	@HttpCode(200)
	async test() {
		return 'route GET: .../api/auth/test'
	}

}
