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
    lat: string;
    @IsNotEmpty()
    lng: string;
    @IsNotEmpty()
    time: string;
    @IsNotEmpty()
    type: string;
   
}
