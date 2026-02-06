export interface IResponse<T = any> {
  success: boolean;
  data?: T;
  error: string;
}

export interface MetaPaginate {
  total_page: number;
  current_page: number;
  limit: number;
  pages?: number;  
}

export interface IResponsePaginate<T = any> extends IResponse<T> {
  meta?: MetaPaginate;
}


// Interface untuk Karyawan
interface Karyawan {
  id: string;
  nama: string;
  username: string;
  password: string;
  jabatan: string;
  role: string;
  created_at: string;
  update_at: string;
}

 
export interface Absensi {
  id: string;
  karyawan: Karyawan; 
  karyawan_id: string;
  address: string;
  catatan: string;
  date: string; 
  file: string;  
  lat: string;  
  lng: string;  
  time: string; 
  type: "clockin" | "clockout" | string; 
  created_at: string; 
  update_at: string; 
}
