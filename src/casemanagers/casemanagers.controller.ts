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
  UploadedFile,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CasemanagersService } from './casemanagers.service';
import { CreateCasemanagerDto } from './dto/create-casemanager.dto';
import { UpdateCasemanagerDto } from './dto/update-casemanager.dto';
import { CasemanagerEntity } from './entities/casemanager.entity';
import { Express } from 'express';
import { PrismaClientExceptionFilter } from '../primsa-client-exception/prisma-client-exception.filter';
import { S3Service } from '../s3/S3.service';
import { S3ImageFile } from '../s3/S3-file.decorator';
import { S3ParseFile } from '../s3/S3-parsefile.pipe';

@Controller('casemanagers')
@ApiTags('casemanagers')
@UseFilters(PrismaClientExceptionFilter)
export class CasemanagersController {
  constructor(
    private readonly casemanagersService: CasemanagersService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: CasemanagerEntity })
  create(@Body() createCasemanagerDto: CreateCasemanagerDto) {
    return this.casemanagersService.create(createCasemanagerDto);
  }

  @Post(':id/upload')
  @S3ImageFile('profile', true)
  @ApiCreatedResponse({ type: CasemanagerEntity })
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(S3ParseFile) file: Express.Multer.File,
  ) {
    const uploadedFile = await this.s3Service.uploadFile(file);
    const url = uploadedFile.Location;

    return this.casemanagersService.updateProfile(id, url);
  }

  @Get()
  @ApiCreatedResponse({ type: CasemanagerEntity, isArray: true })
  async findAll(
    @Query('skip', new DefaultValuePipe(0)) skip: string,
    @Query('take', new DefaultValuePipe(10)) take: string,
    @Query('email') email?: string,
  ) {
    if (email) {
      const caseManager = await this.casemanagersService.findOneByEmail(email);
      if (!caseManager) {
        throw new NotFoundException(
          `Case manager with email: ${email} not found.`,
        );
      } else {
        return caseManager;
      }
    }

    return this.casemanagersService.findAll({
      skip: Number(skip),
      take: Number(take),
    });
  }

  @Get(':email/cases')
  @ApiCreatedResponse({ type: CasemanagerEntity })
  async findAllCases(@Param('email') email: string) {
    const cases = await this.casemanagersService.findAllCases(email);
    return cases;
  }

  @Get(':id')
  @ApiCreatedResponse({ type: CasemanagerEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const caseManager = await this.casemanagersService.findOne(id);

    if (!caseManager) {
      throw new NotFoundException(`Case manager with ID: ${id} not found.`);
    }

    return caseManager;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CasemanagerEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCasemanagerDto: UpdateCasemanagerDto,
  ) {
    return this.casemanagersService.update(id, updateCasemanagerDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CasemanagerEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.casemanagersService.remove(id);
  }
}
