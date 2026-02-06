import { IsNotEmpty } from 'class-validator';

export class CreateKaryawanDto {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  jabatan: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  password: string;
}