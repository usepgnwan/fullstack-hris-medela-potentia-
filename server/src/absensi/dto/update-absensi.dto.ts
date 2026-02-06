import { PartialType } from '@nestjs/swagger';
import { CreateAbsensiDto } from './create-absensi.dto';

export class UpdateAbsensiDto extends PartialType(CreateAbsensiDto) {}
