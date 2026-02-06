import axios from 'axios';

// Secret key dari environment variable
const APIKEY = process.env.REACT_APP_APIKEY || 'default-secret-key';
 

// Buat instance axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json', 
  },
});
 
const generateSignature = (data: any, timestamp: number): string => { 
  const stringToSign = `${APIKEY}${timestamp}${JSON.stringify(data || {})}`; 
  return btoa(stringToSign);  
};

// Request interceptor untuk menambahkan headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const timestamp = Date.now(); 
    config.headers['X-Timestamp'] = timestamp;
    config.headers['x-api-key'] = APIKEY;
     
    if (config.method?.toLowerCase() === 'post' || 
        config.method?.toLowerCase() === 'put' || 
        config.method?.toLowerCase() === 'delete') {
      config.headers['X-Signature'] = generateSignature(config.data, timestamp);
    }
     
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);
 
export const get = async <T>(
  url: string, 
  params?: any, 
  customHeaders?: Record<string, string>
): Promise<T> => {
  try {
    const config: any = { 
      params,
      headers: {
        ...customHeaders, 
        'X-Request-Type': 'GET',
      }
    };
    
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
 
export const post = async <T>(
  url: string, 
  data?: any, 
  customHeaders?: Record<string, string>
): Promise<T> => {
  try {
    const config = {
      headers: {
        ...customHeaders,
        'X-Request-Type': 'POST',
      }
    };
    
    const response = await api.post<T>(url, data, config);
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Fungsi untuk request dengan signature khusus
export const getWithSignature = async <T>(
  url: string, 
  params?: any,
  additionalData?: any
): Promise<T> => {
  try {
    const timestamp = Date.now();
    const signatureData = {
      params,
      timestamp,
      ...additionalData,
    };
    
    const signature = generateSignature(signatureData, timestamp);
    
    const config = {
      params,
      headers: {
        'X-Timestamp': timestamp,
        'X-Signature': signature,
        'X-Signature-Data': JSON.stringify(signatureData),
      }
    };
    
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Versi 2: Tambah secret key ke semua request secara otomatis
export const secureGet = async <T>(
  url: string, 
  params?: any
): Promise<T> => {
  try {
    const timestamp = Date.now();
    
    const config = {
      params,
      headers: {
        'X-Timestamp': timestamp,
        'x-api-key': APIKEY,
        'X-Request-ID': generateRequestId(),
      }
    };
    
    const response = await api.get<T>(url, config);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Generate unique request ID
const generateRequestId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
 
export default api;