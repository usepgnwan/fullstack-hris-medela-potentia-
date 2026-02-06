import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateKaryawanDto } from './dto/create-karyawan.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Karyawan } from './entities/karyawan.entity'; 
import * as bcrypt from 'bcrypt';
import { LoginKaryawanDto } from './dto/login-karyawan.dto'; 
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class KaryawanService {
  constructor(
  @InjectRepository(Karyawan)
    private repo: Repository<Karyawan>,
      private jwtService: JwtService,
  ) {}
   
  async create(dto: CreateKaryawanDto) { 
    const existing = await this.repo.findOne({ where: { username: dto.username } });
    
    if (existing) throw new ConflictException('Username sudah digunakan'); 
    const hashedPassword = await bcrypt.hash(dto.password, 10); 
    
    const karyawan = this.repo.create({
      ...dto,
      password: hashedPassword,
    }); 
    
    const saved = await this.repo.save(karyawan); 
    
    const { password, ...result } = saved;
    
    return result;
  }


  async login(dto: LoginKaryawanDto) {
    
    const existing = await this.repo.findOne({
      where: { username: dto.username },
    }); 

   
    if (!existing) throw new NotFoundException('Username tidak ditemukan');
 
    const match = await bcrypt.compare(dto.password.trim(), existing.password);
    console.log(dto.password)
    if (!match) throw new UnauthorizedException('Password salah');
 
    const payload = { id: existing.id, username: existing.username, role: existing.role, name:existing.nama, jabatan:existing.jabatan};
    const token = this.jwtService.sign(payload);
 
    const { password, ...userData } = existing;
    
    return { user: userData, token };
  }
 
  findAll(take: number, skip: number) {
    return this.repo.find({
      select: [
        'nama',
        'username',
        'jabatan',
        'role',
        'created_at',
        'update_at',
      ], 
      take, // limit
      skip, // offset = (page-1)*limit
    }); 
  }
  async findAllPaginated(take: number, page: number) {
    const skip = (page - 1) * take; 
    const [data, total] = await this.repo.findAndCount({
      select: [
            'nama',
            'username',
            'jabatan',
            'role',
            'created_at',
            'update_at',
      ],
      take,
      skip,
    });

    const total_page = Math.ceil(total / take);
    const pages =Math.ceil(Number(total_page + (take -1) / take));
    const rows = {
                    success: true,
                    error: '',
                    data:data,
                    meta: {
                            total_page,
                            current_page: Number(page),
                            limit: Number(take),
                            pages: total_page,
                          },
                }
    return rows;
  }
  async findOne(id: string) {
      const karyawan = await this.repo.findOne({
        where: { id:id },
        select: ['id', 'nama', 'username', 'role'],  
      });

      if (!karyawan) {
        throw new NotFoundException(`Karyawan dengan ID ${id} tidak ditemukan`);
      }

      return karyawan;
  }
 
}
