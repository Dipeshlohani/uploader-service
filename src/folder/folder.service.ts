// src/folder/folder.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from './folder.model';
import { CreateFolderDto } from './dto/create-folder.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FolderService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) { }

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    const { name, parentId } = createFolderDto;

    let parentFolder = null;
    if (parentId) {
      parentFolder = await this.folderModel.findById(parentId).exec();
      if (!parentFolder) {
        throw new Error('Parent folder not found');
      }
    }
    const folderPath = path.join(__dirname, '..', '..', 'uploads', name);
    // const folderPath = parentFolder ? path.join(parentFolder.path, name) : name;
    console.log(folderPath, '----here--');
    // Create folder on the file system
    fs.mkdirSync(folderPath, { recursive: true });

    const createdFolder = new this.folderModel({
      name,
      path: folderPath,
      parentId: parentFolder,
    });

    return createdFolder.save();
  }
}
