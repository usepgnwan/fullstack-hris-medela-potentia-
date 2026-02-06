import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, HttpException } from '@nestjs/common';
import { AbsensiService } from './absensi.service';
import { CreateAbsensiDto } from './dto/create-absensi.dto'; 
import type { Response } from 'express';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IResponse, IResponsePaginate } from 'interface';
import { useGlobal } from 'utils/useglobal';
import { Karyawan } from 'src/karyawan/entities/karyawan.entity';
@Controller('absensi')
export class AbsensiController {
  private readonly responsePaginate: <T>(args: IResponsePaginate<T>) => IResponsePaginate<T>;
  private readonly response: <T>(args: IResponse<T>) => IResponse<T>;

  constructor(private readonly absensiService: AbsensiService) { 
    this.responsePaginate = useGlobal().responsepaginate;
    this.response = useGlobal().response;
  }

  @Post()
  @ApiOperation({ summary: 'buat absensi baru' })
  @ApiBody({
    type: CreateAbsensiDto,
    description: 'buat absensi baru',
    examples: {
      example: { 
        value: {
          address: "Jalan Cipedes Hegar, Pajajaran, Cicendo, Bandung City, West Java, Java, 40163, Indonesia",
          catatan: "",
          date: "2026-02-07",
          file: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          lat: -6.899089467605379,
          lng: 107.58910399999999,
          time: "00:26",
          type: "clockin",
          karyawan_id: "uuid-karyawan-here"
        }
      }
    }
  })
 async create(@Body() createKaryawanDto: CreateAbsensiDto, @Res() res: Response) {
    try {
       const data = await this.absensiService.create(createKaryawanDto);
       return res.status(200).json(this.response({ success: true, error: '', data: data }))
    } catch (e) {
      if (e instanceof HttpException) {
        const status = e.getStatus();
        return res.status(status).json(this.response({ success: false, error: e.message, data: null }));
      } 
      return res.status(500).json(this.response({ success: false, error: e.message, data: null }));
    }
  }

@Get()
  @ApiOperation({ summary: 'Get all absensi karyawan with pagination' })
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
  @ApiQuery({
    name: 'karyawanID',
    required: false,
    type: String,
    description: 'id karyawan',
    example: "fef5c218-12b4-4632-b5eb-76bff736c898"
  })
  @ApiQuery({
    name: 'date',
    required: false,
    type: String,
    description: 'date',
    example: "2026-02-07"
  })
   @ApiOkResponse({
    description: 'List absensi Karyawan paginated',
    schema: {
      example: {
        success: true,
        error: '',
        data: [],
        meta: {
          total_page: 55,
          current_page: 1,
          limit: 5,
          pages: 55
        },
      },
    },
  }) 
  async findAll(@Query('limit') limit = 10, @Query('page') page = 1, @Query('karyawanID') karyawanID = "", @Query('date') date="", @Res() res: Response) { 
    try{
        const data = await this.absensiService.findAllPaginated(limit, page, {
          karyawanID : karyawanID,
          date : date
        }); 
        return res.status(200).json(this.responsePaginate(data));
    }catch(e){
        return res.status(500).json(this.response({ success: false, error: e.message, data: null }));
    }

  } 
}
