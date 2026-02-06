import { Injectable } from '@nestjs/common';
import { CreateAbsensiDto } from './dto/create-absensi.dto';
import { UpdateAbsensiDto } from './dto/update-absensi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Absensi } from './entities/absensi.entity';
import { Karyawan } from 'src/karyawan/entities/karyawan.entity';
import { saveBase64File } from 'utils/saveBase64File';

@Injectable()
export class AbsensiService {
  constructor(
    @InjectRepository(Absensi)
      private repo: Repository<Absensi>, 
  ) {}
     
async create(createAbsensiDto: CreateAbsensiDto) {
    let fileUrl = '';
    if (createAbsensiDto.file) {
      fileUrl = saveBase64File(createAbsensiDto.file); 
    }

    const absensi = this.repo.create({
      ...createAbsensiDto,
      file: fileUrl,  
    });

    return await this.repo.save(absensi);
}   
async findAllPaginated( take: number,   page: number,  filters?: { absensiId?: string; karyawanID?: string , date:string},) {
  const skip = (page - 1) * take; 
  const query = this.repo.createQueryBuilder('absensi')
    .innerJoinAndSelect('absensi.karyawan', 'karyawan') 
    .take(take)
    .skip(skip);
 
  if (filters?.absensiId) {
    query.andWhere('absensi.id = :absensiId', { absensiId: filters.absensiId });
  }
 
  if (filters?.date) {
    query.andWhere('absensi.date = :date', { date: filters.date });
  }
  
 
  if (filters?.karyawanID) {
    query.andWhere('karyawan.id = :karyawanID', { karyawanID: filters.karyawanID });
  }

  const [data, total] = await query.getManyAndCount();

  const total_page = Math.ceil(total / take);

  return {
    success: true,
    error: '',
    data:data,
    meta: {
      total_page,
      current_page: Number(page),
      limit: Number(take),
      pages: total_page,
    },
  };
}
 
}
