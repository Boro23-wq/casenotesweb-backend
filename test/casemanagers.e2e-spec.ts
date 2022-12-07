import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { useContainer } from 'class-validator';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AppModule } from '@/src/app.module';

describe('Case Manager Controller (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const caseManagerShape = expect.objectContaining({
    id: expect.any(Number),
    createdAt: expect.any(String),
    modifiedAt: expect.any(String),
    firstName: expect.any(String),
    lastName: expect.any(String),
    phone: expect.any(String),
    email: expect.any(String),
    profileUrl: expect.any(String),
  });

  const newCaseManager = {
    firstName: 'Test',
    lastName: 'User',
    phone: '8623817228',
    email: 'testuser@cm.io',
  };

  const newCaseManagerWithoutEmail = {
    firstName: 'Test',
    lastName: 'User 2',
    phone: '8623817220',
  };

  const mockExistingCaseManager = [
    {
      id: 1,
      createdAt: '2022-11-02T18:01:21.121Z',
      modifiedAt: '2022-11-03T06:36:15.530Z',
      firstName: 'John',
      lastName: 'Doe',
      phone: '8623817665',
      email: 'johndoe@cm.io',
      profileUrl: 'https://profileimagebkt.s3.amazonaws.com/avatar.webp',
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
  });

  describe('GET /casemanagers', () => {
    it('Returns an array of case managers.', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/casemanagers',
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([caseManagerShape]));
      expect(body).toHaveLength(10);
      expect(body[0].email).toEqual(mockExistingCaseManager[0].email);
    });
  });

  describe('GET /casemanagers/{id}', () => {
    it('Returns a case manager with the provided ID.', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/caseManagers/${mockExistingCaseManager[0].id}`,
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual(caseManagerShape);
      expect(body.id).toEqual(mockExistingCaseManager[0].id);
      expect(body.email).toEqual(mockExistingCaseManager[0].email);
    });

    it('Fails to return non existing case manager.', async () => {
      const { status } = await request(app.getHttpServer()).get(
        `/casemanagers/40`,
      );

      expect(status).toBe(404);
    });

    it('Fails to return case managers with invalid id type.', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/articles/invalid-id`,
      );

      expect(status).toBe(404);
    });
  });

  describe('POST /casemanagers', () => {
    it('Creates a case manager.', async () => {
      const beforeCount = await prisma.caseManager.count();

      const { status, body } = await request(app.getHttpServer())
        .post('/casemanagers')
        .send(newCaseManager);

      const afterCount = await prisma.caseManager.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('Fails to create a case manager without email.', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/casemanagers')
        .send(newCaseManagerWithoutEmail);

      expect(status).toBe(400);
    });

    it('It should return a conflict violation.', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/casemanagers')
        .send(newCaseManager);

      expect(status).toBe(409);
    });
  });
});
