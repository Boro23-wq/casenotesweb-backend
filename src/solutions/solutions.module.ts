import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

@Module({
  controllers: [SolutionsController],
  providers: [SolutionsService],
  imports: [PrismaModule],
})
export class SolutionsModule {}
