import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as PostmanConverter from 'openapi-to-postmanv2';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('nest js')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  PostmanConverter.convert(
    {
      data: document,
      type: 'json',
    },
    { schemaFaker: true },
    (err, res) => {
      if (err) {
        console.error('Błąd konwertera:', err);
        return;
      }
      if (!res?.result) {
        console.error('Konwersja nieudana:', res?.reason);
        return;
      }

      // 3. Zapis do pliku
      fs.writeFileSync(
        './postman_collection.json',
        JSON.stringify(((res?.output as any[])[0] as any).data, null, 2),
      );
    },
  );

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
