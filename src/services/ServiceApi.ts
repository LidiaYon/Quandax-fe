import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '../utils/session.utils';
import { EndPoints } from '../settings/EndPoints';

// Define base API response interface
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// no token needed
const guestPaths = ['/login', '/register', '/forgot-password'];

class ServiceAPI {
  private api: AxiosInstance;
  private static instance: ServiceAPI;

  private constructor() {
    this.api = axios.create({
      baseURL: EndPoints.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds

    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        
        const isExcluded = guestPaths.some((path) =>
          config.url?.includes(path)
        );

        if (!isExcluded) {
          const token = getToken();
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          getToken()
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ServiceAPI {
    if (!ServiceAPI.instance) {
      ServiceAPI.instance = new ServiceAPI();
    }
    return ServiceAPI.instance;
  }

  // Generic GET request
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Generic POST request
  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Generic PUT request
  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Generic DELETE request
  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  public async uploader<T>(
    url: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    try {
      const token = getToken()
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }


  }




  // Error handler
  private handleError(error: any): any {
    if (error.response) {
      const { data } = error.response;
  
      // Handle express-validator errors
      if (Array.isArray(data.errors)) {
        // Return the array of validation errors as-is
        throw { errors: data.errors };
      }
  
      // Handle API errors with a specific error object
      if (data.error && data.error.message) {
        throw { message: data.error.message };
      }
  
      // Generic fallback for unexpected API errors
      throw new Error('An unknown error occurred with the server');
    } else if (error.request) {
      // Handle cases where the request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Handle cases where the error occurred while setting up the request
      throw new Error('Error setting up the request');
    }
  }
  
}

export const serviceApi = ServiceAPI.getInstance();
export default serviceApi;