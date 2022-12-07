import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';

@Module({
  controllers: [CasesController],
  providers: [CasesService],
  imports: [PrismaModule],
})
export class CasesModule {}
