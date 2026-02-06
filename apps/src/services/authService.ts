import { jwtDecode } from 'jwt-decode';
import { post } from '../utils/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return post<LoginResponse>('/auth/login', credentials);
  },

  // Register
  register: async (data: RegisterRequest): Promise<{ message: string }> => {
    return post('/auth/register', data);
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('token'); 
  },

  // Simpan data user ke localStorage
  setAuthData: (data: any): void => {
    localStorage.setItem('token', data); 
  },

  // Ambil data user dari localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('token');
    const decoded : any = jwtDecode(userStr??""); 
    return userStr ? decoded : null;
  },

  // Cek apakah user sudah login
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Cek role user
//   hasRole: (role: string): boolean => {
//     const user = authService.getCurrentUser();
//     return user?.role === role;
//   },

  // Cek permission
//   hasPermission: (permission: string): boolean => {
//     const user = authService.getCurrentUser();
//     return user?.permissions?.includes(permission) || false;
//   },
};