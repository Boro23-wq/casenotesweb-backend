import { Module } from '@nestjs/common';
import { CasemanagersService } from './casemanagers.service';
import { CasemanagersController } from './casemanagers.controller';
import { S3Service } from '../s3/S3.service';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  controllers: [CasemanagersController],
  providers: [CasemanagersService, S3Service],
  imports: [PrismaModule],
})
export class CasemanagersModule {}
