import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/folder-uploader'),
    FolderModule,
    FileModule,
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }