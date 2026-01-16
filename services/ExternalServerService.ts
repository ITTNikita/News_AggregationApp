import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { ExternalServerInput } from '../models/ExternalServerInput';
import { logMessage } from '../logs/LogService';
import { log } from 'node:util';

export class ExternalServerService {
  static async fetchStatuses() {
    logMessage("Fetching external server statuses");
    const response = await axios.get(`${BASE_URL}/external-servers/status`);
    return response.data;
  }

  static async fetchDetails() {
    logMessage("Fetching external server details");
    const response = await axios.get(`${BASE_URL}/external-servers/details`);
    return response.data;
  }

  static async updateServerKey(serverId: string, apiKey: string) {
    logMessage(`Updating API key for server ID: ${serverId}`);
    const response = await axios.put(`${BASE_URL}/external-servers/${serverId}`, {
      api_key: apiKey,
    });
    return response.data;
  }

  static async addNewServer(input: ExternalServerInput) {
    logMessage("Adding new external server");
    const response = await axios.post(`${BASE_URL}/external-servers`, {
      parameters: input
    });
    return response.data;
  }
  
  static async addNewCategory(category:string)
  {
    logMessage("Adding new category to external server");
    const response = await axios.post(`${BASE_URL}/external-servers/new-category`,
      {
        parameters:category
      }
    )
    return response.data;
  }
}
