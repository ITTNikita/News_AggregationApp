import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { logMessage } from '../logs/LogService';
import { log } from 'console';

export class AdminService {
 
  static async hideArticleGlobally(articleId: string) {
    logMessage(`Hiding article globally: ${articleId}`);
    const response = await axios.post(`${BASE_URL}/admin/hide-article-global`, {
      articleId
    });
    return response.data;
  }

  static async hideCategory(categoryName: string) {
    logMessage(`Hiding category: ${categoryName}`);
    const response = await axios.post(`${BASE_URL}/admin/hide-category`, {
      categoryName
    });
    return response.data;
  }

  static async filterArticlesByKeyword(keyword: string) {
    logMessage(`Filtering articles by keyword: ${keyword}`);
    const response = await axios.post(`${BASE_URL}/admin/filter-keyword`, {
      keyword
    });    
    return response.data;
  }

  
}
