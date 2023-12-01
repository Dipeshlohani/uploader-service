// folder.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder, FolderSchema } from './folder.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
  ],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [FolderService],
})
// eslint-disable-next-line prettier/prettier
export class FolderModule { }
