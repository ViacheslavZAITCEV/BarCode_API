import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { UserDto } from '../src/auth/dto/user.dto';


const testDto: UserDto = {
	login: 'loginTest@gmail',
	password: 'passwordTest'
}

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	//
	// routes 'create'
	//

	it('/auth/create (POST) succes', async () => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send(testDto)
			.expect(201)
			.then(({ text }: request.Response) => {
				expect(text).toBeDefined();
			});
	});

	it('/auth/create (POST) fail: bad request', async () => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send({ login: 'loginTest' })
			.expect(400)
	});

	it('/auth/create (POST) fail: login is exist', async () => {
		return request(app.getHttpServer())
			.post('/auth/create')
			.send({ ...testDto, login: 'loginTest' })
			.expect(400)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe('Email is already registred')
			});
	});

	//
	// routes 'login'
	//

	it('/auth/login (POST) succes', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(testDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.acces_token).toBeDefined();
			});
	});

	it('/auth/login (POST) fail: Email not founded', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...testDto, login: '' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe('Email not founded');
			});
	});

	it('/auth/login (POST) fail: Password is wrong', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...testDto, password: 'loginTest' })
			.expect(401)
			.then(({ body }: request.Response) => {
				expect(body.message).toBe('Password is wrong');
			});
	});


	//
	// routes 'delete'
	//

	it('/auth/delete (DELETE) succes', async () => {
		return request(app.getHttpServer())
			.delete('/auth/delete/' + testDto.login)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.ok).toBe(1);
			});
	});

	afterAll(() => {
		disconnect();
	})

})
