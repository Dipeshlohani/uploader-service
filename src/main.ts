import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cors from 'cors';
import * as morgan from 'morgan'
import { config } from 'dotenv';
config();
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const storage = multer.memoryStorage();
  // const upload = multer({ storage });

  // app.use(upload.array('files'));
  // Serve static files from the 'uploads' directory
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Replace with the origin of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use('/uploads', express.static('uploads'));
  await app.listen(process.env.PORT);
}
bootstrap();
