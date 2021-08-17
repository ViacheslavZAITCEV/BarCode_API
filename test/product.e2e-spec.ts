import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { UserDto } from '../src/auth/dto/user.dto';


const testDto: UserDto = {
	login: 'loginTest',
	password: 'passwordTest'
}

const testProduct = '5449000214799'

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(testDto)

		token = body.acces_token
	});


	it('/product/findProductByCode (GET) succes', async () => {
		return request(app.getHttpServer())
			.get('/product/findProductByCode/' + testProduct)
			.set('Authorization', 'Bearer ' + token)
			.send()
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.status_verbose).toBe("product found");
			});
	});

	it('/product/findProductByCode (GET) authorisation fail', async () => {
		return request(app.getHttpServer())
			.get('/product/findProductByCode/' + testProduct)
			.send()
			.expect(401)
	});

	afterAll(() => {
		disconnect();
	})

})
