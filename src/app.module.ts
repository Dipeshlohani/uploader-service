import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderModule } from './folder/folder.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FolderModule,
    FileModule,
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }