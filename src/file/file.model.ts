// src/file/file.model.ts
import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: String,
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  year: Number,
  ref_no: String,
  isPublic: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['activites', 'audit'],
    default: 'audit',
  },
  path: String,
});

export interface File extends mongoose.Document {
  name: string;
  folder: mongoose.Types.ObjectId;
  year: number;
  ref_no: string;
  isPublic: boolean;
  path: string;
}

export const File = mongoose.model<File>('File', FileSchema);
