import axios from 'axios';

export class FontGroupService {
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

  async getAllFontGroups() {
    try {
      return await this.api.get('/font-groups');
    } catch (error) {
      console.error('Error fetching font groups:', error);
      throw error;
    }
  }

  async getFontGroup(groupId) {
    try {
      return await this.api.get(`/font-groups/${groupId}`);
    } catch (error) {
      console.error('Error fetching font group:', error);
      throw error;
    }
  }

  async createFontGroup(groupData) {
    try {
      return await this.api.post('/font-groups', groupData);
    } catch (error) {
      console.error('Error creating font group:', error);
      throw error;
    }
  }

  async updateFontGroup(groupId, groupData) {
    try {
      return await this.api.put(`/font-groups/${groupId}`, groupData);
    } catch (error) {
      console.error('Error updating font group:', error);
      throw error;
    }
  }

  async deleteFontGroup(groupId) {
    try {
      return await this.api.delete(`/font-groups/${groupId}`);
    } catch (error) {
      console.error('Error deleting font group:', error);
      throw error;
    }
  }
} 