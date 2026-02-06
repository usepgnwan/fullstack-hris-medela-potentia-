import { IsNotEmpty } from "class-validator";

export class CreateAbsensiDto {
    @IsNotEmpty()
    karyawan_id: string;
    address: string;
    catatan: string;
    @IsNotEmpty()
    date: string;
    @IsNotEmpty()
    file: string;
    @IsNotEmpty()
    lat: number;
    @IsNotEmpty()
    lng: number;
    @IsNotEmpty()
    time: string;
    @IsNotEmpty()
    type: string;
   
}
