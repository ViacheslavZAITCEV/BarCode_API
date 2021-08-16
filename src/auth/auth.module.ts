import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Module({
	controllers: [AuthController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: AuthModel,
				schemaOptions: {
					collection: 'Users'
				}
			}
		])
	],
	providers: [AuthService]
})
export class AuthModule { }
