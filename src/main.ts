import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { API_PREFIX_PATH } from './utils/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';


export function setupMiddleware(app: INestApplication) {
  const expressApp = app as NestExpressApplication;
  dotenv.config();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  //set up swagger
  const apiPath = `${API_PREFIX_PATH}/docs`;

  // app.use([apiPath]);
  const config = new DocumentBuilder()
    .setTitle('Xypass')
    .setDescription('Xypass project')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', in: 'header' }, 'token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiPath, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  expressApp.disable('x-powered-by');

  expressApp.use(bodyParser.json({ limit: '2048mb' }));
  expressApp.use(bodyParser.urlencoded({ limit: '2048mb', extended: true }));

  expressApp.use(compression());
  expressApp.use(cookieParser());

  // Enable CORS
  expressApp.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  return expressApp;
}


async function createAppInstance() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  setupMiddleware(app);

  return app;
}

async function bootstrap() {
  const app = await createAppInstance();

  await app.listen(process.env.PORT);
  Logger.log(`Server listens on PORT: ${process.env.PORT}`);
}
bootstrap();
