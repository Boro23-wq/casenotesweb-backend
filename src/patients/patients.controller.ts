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
import { PrismaClientExceptionFilter } from '../primsa-client-exception/prisma-client-exception.filter';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientEntity } from './entities/patient.entity';
import { PatientsService } from './patients.service';

@Controller('patients')
@ApiTags('patients')
@UseFilters(PrismaClientExceptionFilter)
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiCreatedResponse({ type: PatientEntity })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiCreatedResponse({ type: PatientEntity, isArray: true })
  async findAll(
    @Query('skip', new DefaultValuePipe(0)) skip: string,
    @Query('take', new DefaultValuePipe(10)) take: string,
    @Query('email') email?: string,
  ) {
    if (email) {
      const patient = await this.patientsService.findOneByEmail(email);
      if (!patient) {
        throw new NotFoundException(`Patient with email: ${email} not found.`);
      } else {
        return patient;
      }
    }

    return this.patientsService.findAll({
      skip: Number(skip),
      take: Number(take),
    });
  }

  @Get(':id')
  @ApiCreatedResponse({ type: PatientEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this.patientsService.findOne(id);

    if (!patient) {
      throw new NotFoundException(`Patient with ID: ${id} not found.`);
    }

    return patient;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PatientEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: PatientEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }
}
