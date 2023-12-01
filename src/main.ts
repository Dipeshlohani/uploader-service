import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan'
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();

const server = express();
server.use(cors());
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: false, limit: '50mb' }));
server.use(morgan('dev')); // Use morgan middleware with 'dev' format

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const storage = multer.memoryStorage();
  // const upload = multer({ storage });

  // app.use(upload.array('files'));

  await app.listen(3000);
}
bootstrap();
