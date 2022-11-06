import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
  UseFilters,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/primsa-client-exception/prisma-client-exception.filter';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { SolutionEntity } from './entities/solution.entity';
import { SolutionsService } from './solutions.service';

@Controller('solutions')
@ApiTags('solutions')
@UseFilters(PrismaClientExceptionFilter)
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  // @Post()
  // @ApiCreatedResponse({ type: NoteEntity })
  // create(@Body() createNoteDto: CreateNoteDto) {
  //   return this.notesService.create(createNoteDto);
  // }

  // @Get()
  // @ApiCreatedResponse({ type: NoteEntity, isArray: true })
  // async findAll(
  //   @Query('skip', new DefaultValuePipe(0)) skip: string,
  //   @Query('take', new DefaultValuePipe(10)) take: string,
  // ) {
  //   return this.notesService.findAll({
  //     skip: Number(skip),
  //     take: Number(take),
  //   });
  // }

  @Get(':id')
  @ApiCreatedResponse({ type: SolutionEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const solution = await this.solutionsService.findOne(id);

    if (!solution) {
      throw new NotFoundException(`Solution with ID: ${id} not found.`);
    }

    return solution;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: SolutionEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ) {
    return this.solutionsService.update(id, updateSolutionDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: SolutionEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.solutionsService.remove(id);
  }
}
