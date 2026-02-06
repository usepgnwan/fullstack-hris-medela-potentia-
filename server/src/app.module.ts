import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KaryawanModule } from './karyawan/karyawan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsensiModule } from './absensi/absensi.module';

 
@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true, 
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username:  process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database:  process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: false, 
      }),
      KaryawanModule,
      AbsensiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
