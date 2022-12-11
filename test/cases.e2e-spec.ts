import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Cases Controller (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const caseShape = expect.objectContaining({
    id: expect.any(Number),
    createdAt: expect.any(String),
    modifiedAt: expect.any(String),
    status: expect.any(String),
    subject: expect.any(String),
    caseManagerEmail: expect.any(String),
    categoryTitle: expect.any(String),
    patientEmail: expect.any(String),
    severityLevel: expect.any(String),
    doctorEmail: expect.any(String),
  });

  const newCase = {
    status: 'Test',
    subject: 'User',
    caseManagerEmail: 'testcm@cm.io',
    patientEmail: 'testpatientemail@pt.io',
    categoryTitle: 'Test Category',
    severityLevel: 'Test Severity',
    doctorEmail: 'testdoctoremail@dt.io',
  };

  const newCaseManagerWithoutSubject = {
    status: 'Test',
    caseManagerEmail: 'testuser@cm.io',
    patientEmail: 'testpatientemail@pt.io',
    categoryTitle: 'Test Category',
    severityLevel: 'Test Severity',
    doctorEmail: 'testdoctoremail@dt.io',
  };

  const mockExistingCase = [
    {
      id: 1,
      createdAt: '2022-11-03T00:14:38.281Z',
      modifiedAt: '2022-11-23T07:29:58.281Z',
      status: 'Inactive',
      subject: 'Eye Surgery successfully done.',
      caseManagerEmail: 'tcarrabot6@chronoengine.com',
      categoryTitle: 'Eye',
      patientEmail: 'nmarquot4@usda.gov',
      severityLevel: '4-Low',
      doctorEmail: 'gwolstencroftd@163.com',
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

  describe('GET /cases', () => {
    it('Returns an array of cases.', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/cases');

      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([caseShape]));
      expect(body).toHaveLength(10);
      expect(body[0].subject).toEqual(mockExistingCase[0].subject);
    });
  });

  describe('GET /cases/{id}', () => {
    it('Returns a case with the provided ID.', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/cases/${mockExistingCase[0].id}`,
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual(caseShape);
      expect(body.id).toEqual(mockExistingCase[0].id);
      expect(body.patientEmail).toEqual(mockExistingCase[0].patientEmail);
    });

    it('Fails to return non existing case.', async () => {
      const { status } = await request(app.getHttpServer()).get(`/cases/40`);

      expect(status).toBe(404);
    });

    it('Fails to return cases with invalid id type.', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/articles/invalid-id`,
      );

      expect(status).toBe(404);
    });
  });

  describe('POST /cases', () => {
    it('Create a case.', async () => {
      const beforeCount = await prisma.patientCase.count();

      const { status, body } = await request(app.getHttpServer())
        .post('/cases')
        .send(newCase);

      const afterCount = await prisma.patientCase.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('Fails to create a case without subject.', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/casemanagers')
        .send(newCaseManagerWithoutSubject);

      expect(status).toBe(400);
    });
  });
});
