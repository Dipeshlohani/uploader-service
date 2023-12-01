import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { File } from './file.model';
import { Folder } from 'src/folder/folder.model';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<File>,
    @InjectModel(Folder.name) private folderModel: Model<Folder>,
  ) { }

  async create(files, createFileDto: CreateFileDto): Promise<File[]> {
    try {
      // Extract additional data from createFileDto, e.g., folderId
      const { folderId } = createFileDto;
      const filePromises = files.map(async (file) => {

        // Ensure the folder structure exists
        const filePath = file.path;
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Read file content from the file path
        const fileContent = fs.readFileSync(filePath);

        // Save file on the file system
        fs.writeFileSync(filePath, fileContent);

        // Save file information to the database
        const createdFile = new this.fileModel({
          name: file.originalname,
          folderId,
          // Add other properties as needed
        });
        console.log(createdFile, '-createdFile');

        await createdFile.save();

        return { createdFile, filePath };
      });

      return Promise.all(filePromises);
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading files');
    }
  }
}
