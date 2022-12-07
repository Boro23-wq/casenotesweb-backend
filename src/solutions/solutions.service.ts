import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(private prisma: PrismaService) {}

  // create(createNoteDto: CreateNoteDto) {
  //   return this.prisma.note.create({ data: createNoteDto });
  // }

  // async findAll(params: { skip?: number; take?: number }) {
  //   const { skip, take } = params;

  //   if (isNaN(skip)) return this.prisma.note.findMany({ take });

  //   return this.prisma.note.findMany({
  //     skip,
  //     take,
  //   });
  // }

  async findOne(id: number) {
    return await this.prisma.solution.findUnique({ where: { id } });
  }

  update(id: number, updateSolutionDto: UpdateSolutionDto) {
    return this.prisma.solution.update({
      where: { id },
      data: updateSolutionDto,
    });
  }

  remove(id: number) {
    return this.prisma.solution.delete({
      where: { id },
    });
  }
}
