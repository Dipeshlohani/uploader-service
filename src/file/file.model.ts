// src/file/file.model.ts
import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: String,
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
});

export interface File extends mongoose.Document {
  name: string;
  folder: mongoose.Types.ObjectId;
}

export const File = mongoose.model<File>('File', FileSchema);
