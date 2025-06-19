import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { Notification } from '../models/Notification';
import { User } from '../models/User';

export class NotificationService {
  static async getNotifications(user: User): Promise<Notification[]> {
    console.log("Fetching notifications for user:", user.id);
    const response = await axios.get(`${BASE_URL}/notifications/${user.id}`);
    console.log("Response data:", response.data);
    return response.data;
  }
static async setCategoryPreference(userId: string, category: string, isEnabled: boolean) {
  console.log(`Setting category preference for user ${userId}: ${category} isEnabled: ${isEnabled}`);
    try {
    await axios.post(`${BASE_URL}/notifications/category`, {
      userId,
      category,
      isEnabled
    });
    return true;
  } catch (err) {
    console.error(' Error setting category preference:');
    return false;
  }
} 
static async getUserKeywords(userId: string): Promise<{ keyword: string; is_enabled: number }[]> {
  try {
    console.log("testing nikita")
    const response = await axios.get(`${BASE_URL}/notifications/keywords/${userId}`);
    console.log(response.data);
    return response.data; 
  } catch (err) {
    console.error(' Failed to fetch keywords:', err);
    return [];
  }
}
static async addKeyword(userId: string, keyword: string): Promise<boolean> {
  try {
    await axios.post(`${BASE_URL}/notifications/keywords`, { userId, keyword });
    return true;
  } catch (err) {
    console.error(' Failed to add keyword:', err);
    return false;
  }
}
static async updateKeywordStatus(userId: string, keyword: string, isEnabled: string): Promise<boolean> {
  try {
    const enabled = isEnabled === '1';
    const response = await axios.put(`${BASE_URL}/notifications/keywords/Status`, {
      userId,
      keyword,
      isEnabled: enabled
    });
    return isEnabled==='1';
  } catch (err) {
    console.error('Failed to update keyword status:', err);
    return false;
  }
}
}
