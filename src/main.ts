import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SWAGGER
  const options = new DocumentBuilder()
    .setTitle('Nest.js Boilerplate')
    .setDescription('API')
    .setVersion('0.1')
    .setContact('Max Kilazi', 'http://kilazi.com', 'sergeev.maxs@gmail.com')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  // SWAGGER END


  await app.listen(3000);
}
bootstrap();
