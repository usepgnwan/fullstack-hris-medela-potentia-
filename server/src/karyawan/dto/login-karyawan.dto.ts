import { IsNotEmpty } from 'class-validator';

export class LoginKaryawanDto {
 
  @IsNotEmpty()
  username: string; 

  @IsNotEmpty()
  password: string;
}