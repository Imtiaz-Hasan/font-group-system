import axios from 'axios';

export class FontService {
  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor for debugging
    this.api.interceptors.request.use(
      (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for debugging
    this.api.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
      }
    );
  }

  async getAllFonts() {
    try {
      return await this.api.get('/fonts');
    } catch (error) {
      console.error('Error fetching fonts:', error);
      throw error;
    }
  }

  async uploadFont(file) {
    try {
      const formData = new FormData();
      formData.append('font_file', file);
      
      return await this.api.post('/fonts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error uploading font:', error);
      throw error;
    }
  }

  async deleteFont(fontId) {
    try {
      return await this.api.delete(`/fonts/${fontId}`);
    } catch (error) {
      console.error('Error deleting font:', error);
      throw error;
    }
  }
} 