import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // brforeEach -> beforeAll
  // test를 할 때마다 app을 생성하지 않게 하기 위함.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 테스트 환경도 동일하게 설정
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie api');
  });

  // e2e test
  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);  // 빈 객체가 나와야 성공.
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['Test'],
        })
        .expect(201); // 201은 create 성공
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
      // e2e test에서는 transform이 동작하지 않음
      // app을 생성하면서, 어떠한 pipe에도 올려놓지 않았음.
      // 따라서 e2e , unit test를 할 때는 테스트에서도 실제 app 환경을 적용해 주어야 함!
      .get('/movies/1') 
      .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999') 
      .expect(404);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  })

});
