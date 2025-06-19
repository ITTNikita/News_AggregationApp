import axios from 'axios';
import { BASE_URL } from '../config/constant';

export interface ExternalServerInput {
  name: string;
  apiurl: string;
  key: string;
   isActive: number;
  article_id:string;
  title:string;
  description:string;
  source_name:string;
  url:string;
  category:string;
  dataKey:string;
}

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
}
