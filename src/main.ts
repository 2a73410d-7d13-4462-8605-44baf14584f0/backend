import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  app.enableCors();

  const port = process.env.PORT;

  const config = new DocumentBuilder()
    .setTitle('ShortenedURL')
    .setDescription('Lorem ipsum dolor sit amet')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port, async () => {
    console.log(`Now listening to port ${await app.getUrl()}`);
  });
}
bootstrap();
