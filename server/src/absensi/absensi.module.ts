import { Module } from '@nestjs/common';
import { AbsensiService } from './absensi.service';
import { AbsensiController } from './absensi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Karyawan } from 'src/karyawan/entities/karyawan.entity';
import { Absensi } from './entities/absensi.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Karyawan, Absensi]), 
  ],
  controllers: [AbsensiController],
  providers: [AbsensiService],
})
export class AbsensiModule {}
