// file-uploader/middleware/folder-id.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FolderIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const folderId = req.body.folderId || 'defaultFolder';
    console.log(req.body, '---rebody')
    req['folderId'] = folderId; // Attach folderId to the request object
    next();
  }
}
