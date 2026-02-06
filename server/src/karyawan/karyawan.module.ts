import { Module } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Karyawan } from './entities/karyawan.entity';
import { JwtModule } from '@nestjs/jwt';
import { Absensi } from 'src/absensi/entities/absensi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Karyawan, Absensi]), 
    JwtModule.register({
      secret: process.env.AUTHSECRETKEY || 'secretKey', // gunakan .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [KaryawanController],
  providers: [KaryawanService],
})
export class KaryawanModule {}
