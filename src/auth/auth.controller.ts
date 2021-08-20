import { BadRequestException, Body, Controller, Delete, HttpCode, Param, Post, Type, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ALREADY_REGISTRED_USER } from './auth.constatnts';
import { UserModel } from './user.model';
import { AuthService } from './auth.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }


	/**
	 * Route /create
	 * Checks if the user is registred
	 * @param dto new User
	 * @returns login of the user
	 * @returns 400 if the user is registred
	 */
	@ApiBody({ type: UserModel })
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: UserModel) {
		const oldUser = await this.authService.findUser(dto.login)
		if (oldUser) {
			throw new BadRequestException(ALREADY_REGISTRED_USER)
		}
		const user = await this.authService.createUser(dto);
		return user.login;
	}


	/**
	 * Route /login
	 * return JWT token if autentification is correct
	 * @param dto user
	 * @returns Type.Object {acces_token: string}
	 */
	@ApiBody({ type: UserModel })
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: UserModel) {
		const user = await this.authService.validateUser(dto.login, dto.password);
		return this.authService.login(user.login)
	}


	/**
	 * Route /update
	 * only authenticated access to the route
	 * find login by autentification data
	 * update data in MongoDB
	 * return JWT token if recorded is updated
	 * @param dto user
	 * @returns Type.Object {acces_token: string}
	 */
	// @UseGuards(JwtAuthGuard)
	// @UsePipes(new ValidationPipe())
	// @Post('update')
	// async update(@Body() dto: UserModel) {

	// }

	/**
	 * Route /delete
	 * @param login 
	 * @returns response MongoDB
	 */
	@ApiParam({ name: 'login', type: 'string' })
	@Delete('delete/:login')
	async delete(@Param('login') login: string) {
		return await this.authService.delete(login);
	}



}
