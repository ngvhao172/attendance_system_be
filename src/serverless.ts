import serverlessExpress from "@codegenie/serverless-express";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { APIGatewayProxyEvent, Callback, Context, Handler } from "aws-lambda";
import cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { setupMiddleware } from "./main";

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupMiddleware(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

// AWS Lambda handler function
export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
