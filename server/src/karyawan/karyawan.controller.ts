import { Controller, Get, Post, Body, Param,  Query, HttpException, Res } from '@nestjs/common';
import { KaryawanService } from './karyawan.service';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { useGlobal } from 'utils/useglobal';
import { IResponse, IResponsePaginate } from 'interface';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import type { Response } from 'express';
@Controller('karyawan')
export class KaryawanController { 
  private readonly responsePaginate: <T>(args: IResponsePaginate<T>) => IResponsePaginate<T>;
  private readonly response: <T>(args: IResponse<T>) => IResponse<T>;

  constructor(private readonly karyawanService: KaryawanService) { 
    this.responsePaginate = useGlobal().responsepaginate;
    this.response = useGlobal().response;
  }


  @Post()
  @ApiOperation({ summary: 'buat karyawan baru' })
  @ApiBody({
    type: CreateKaryawanDto,
    description: 'buat karyawan baru',
    examples: {
      example: { 
        value: {
          nama: 'John Doe',
          username: 'john.doe@example.com',
          jabatan: 'Software Engineer',
          role: 'HR', 
          password: 'passsword',  
        }
      }
    }
  })
 async create(@Body() createKaryawanDto: CreateKaryawanDto, @Res() res: Response) {
    try {
       const data =await this.karyawanService.create(createKaryawanDto);
       return res.status(200).json(this.response({ success: true, error: '', data: data }))
    } catch (e) {
      if (e instanceof HttpException) {
        const status = e.getStatus();
        return res.status(status).json(this.response({ success: false, error: e.message, data: null }));
      } 
      return res.status(500).json(this.response({ success: false, error: 'Internal Server Error', data: null }));
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all karyawan with pagination' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Jumlah data per halaman (default: 10)',
    example: 10
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'halaman ke (default: 1)',
    example: 1
  })
   @ApiOkResponse({
    description: 'List Karyawan paginated',
    schema: {
      example: {
        success: true,
        error: '',
        data: [
          { id: 'uuid-1', nama: 'Budi', username: 'budi123', role: 'ADMIN' }, 
        ],
        meta: {
          total_page: 55,
          current_page: 1,
          limit: 5,
          pages: 55
        },
      },
    },
  }) 
  
  async findAll(@Query('limit') limit = 10, @Query('page') page = 1, @Res() res: Response) { 
    try{
        const data = await this.karyawanService.findAllPaginated(limit, page); 
        return res.status(200).json(this.responsePaginate(data));
    }catch(e){
        return res.status(500).json(this.response({ success: false, error: 'Internal Server Error', data: null }));
    } 
  } 

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.karyawanService.findOne(id);
      return res.status(200).json(this.response({ success: true, error: '', data }));
    } catch (e) {
      if (e instanceof HttpException) {
        const status = e.getStatus();
        return res.status(status).json(this.response({ success: false, error: e.message, data: null }));
      }
 
      return res.status(500).json(this.response({ success: false, error: 'Internal Server Error', data: null }));
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiBody({
    type: CreateKaryawanDto,
    description: 'login',
    examples: {
      example: { 
        value: { 
          username: 'john.doe@example.com', 
          password: 'passsword',  
        }
      }
    }
  })
 async login(@Body() createKaryawanDto: CreateKaryawanDto, @Res() res: Response) {
    try {
       const data =await this.karyawanService.login(createKaryawanDto);
       return res.status(200).json(this.response({ success: true, error: '', data: data }))
    } catch (e) {
      if (e instanceof HttpException) {
        const status = e.getStatus();
        return res.status(status).json(this.response({ success: false, error: e.message, data: null }));
      } 
      return res.status(500).json(this.response({ success: false, error: 'Internal Server Error', data: null }));
    }
  }
}
