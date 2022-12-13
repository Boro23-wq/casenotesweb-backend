import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CasemanagersModule } from './casemanagers/casemanagers.module';
import { CasesModule } from './cases/cases.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { NotesModule } from './notes/notes.module';
import { MilestonesModule } from './milestones/milestones.module';
import { SolutionsModule } from './solutions/solutions.module';
import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/api',
    }),
    CasemanagersModule,
    CasesModule,
    DoctorsModule,
    PatientsModule,
    NotesModule,
    MilestonesModule,
    SolutionsModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
