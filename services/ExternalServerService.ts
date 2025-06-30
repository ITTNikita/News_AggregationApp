import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { ExternalServerInput } from '../models/ExternalServerInput';

export class ExternalServerService {
  static async fetchStatuses() {
    const response = await axios.get(`${BASE_URL}/external-servers/status`);
    return response.data;
  }

  static async fetchDetails() {
    const response = await axios.get(`${BASE_URL}/external-servers/details`);
    return response.data;
  }

  static async updateServerKey(serverId: string, apiKey: string) {
    const response = await axios.put(`${BASE_URL}/external-servers/${serverId}`, {
      api_key: apiKey,
    });
    return response.data;
  }

  static async addNewServer(input: ExternalServerInput) {
    const response = await axios.post(`${BASE_URL}/external-servers`, {
      parameters: input
    });
    return response.data;
  }
  
  static async addNewCategory(category:string)
  {
    const response = await axios.post(`${BASE_URL}/external-servers/new-category`,
      {
        parameters:category
      }
    )
    return response.data;
  }
}
