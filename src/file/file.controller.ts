import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer-config';
import { File } from './file.model';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createFileDto: CreateFileDto,
  ): Promise<{ createdFile: File; relativePath: string }[]> {
    try {
      return this.fileService.create(files, createFileDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerConfig))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('folderId') folderId: string,
  ): Promise<string[]> {
    console.log(files, folderId);
    return [''];
  }
}
