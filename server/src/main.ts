import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';
import { MulterModule } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
 
  const config = new DocumentBuilder()
    .setTitle('HRIS API')
    .setDescription('Dokumentasi api Hris : pt medela potentia tbk')
    .setVersion('1.0') 
    .addBearerAuth()  
    .build();

  // Buat dokumentasi Swagger
  const document = SwaggerModule.createDocument(app, config);
  
  // Setup endpoint Swagger UI (bisa diakses di /api)
  SwaggerModule.setup('api', app, document);
  
  MulterModule.register({
    dest: join(process.cwd(), 'uploads'),
  });
  
  app.use( '/uploads', express.static(join(process.cwd(), 'uploads')),);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.use(
    express.json({ limit: '20mb' })  
  );
  app.use(
    express.urlencoded({ limit: '20mb', extended: true })
  );
  console.log("app running on : " + (process.env.PORT ?? 3000))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
