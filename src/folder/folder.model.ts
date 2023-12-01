// src/folder/folder.model.ts
import * as mongoose from 'mongoose';
import { File } from '../file/file.model';

export const FolderSchema = new mongoose.Schema({
  name: String,
  path: String,
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

// Define a new interface extending mongoose.Document
export interface FolderDocument extends mongoose.Document {
  name: string;
  path: string;
  parentId?: FolderDocument;
  files: mongoose.Types.ObjectId[];
}

export interface Folder extends mongoose.Document {
  name: string;
  path: string;
  parentId?: FolderDocument;
  files: mongoose.Types.ObjectId[];
}

// Use the new interface when creating the model
export const Folder = mongoose.model<FolderDocument>('Folder', FolderSchema);
