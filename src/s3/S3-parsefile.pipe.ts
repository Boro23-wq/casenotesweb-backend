import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class S3ParseFile implements PipeTransform {
  transform(
    file: Express.Multer.File,
    metadata: ArgumentMetadata,
  ): Express.Multer.File {
    // 1MB ~ 1000KB
    const oneMb = 1000;

    console.log('File is', file);

    if (file === undefined || file === null || file.size < oneMb) {
      throw new BadRequestException(
        'File expected and file should be less than 1MB.',
      );
    }

    return file;
  }
}
