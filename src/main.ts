import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { expressCspHeader, NONE, NONCE, SELF } from 'express-csp-header';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configService } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const serviceLogger = new Logger(`Main`);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //helmet to set save http header
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
      frameguard: {
        action: 'deny',
      },
    }),
  );

  //csp
  const cspMiddleware = expressCspHeader({
    directives: {
      'default-src': [NONE],
      'script-src': [NONCE],
      'style-src': [NONCE],
      'img-src': [SELF],
      'font-src': [NONCE, 'fonts.gstatic.com'],
      'object-src': [NONE],
      'block-all-mixed-content': true,
      'frame-ancestors': [NONE],
      // 'worker-src': [NONE],
    },
  });
  process.env.NODE_ENV === 'production' && app.use(cspMiddleware);

  //trust proxy for rate limit
  app.set('trust proxy', 1);

  //rate limit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 0, // limit each IP to 100 requests per windowMs
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger
  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Item API')
        .setDescription('My Item API')
        .setVersion('1.0')
        .addBearerAuth()
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }

  const port = process.env.PORT || 3000;
  serviceLogger.log(`Main Start at port ${port}`);
  await app.listen(port);
}
bootstrap();
