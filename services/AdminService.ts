import axios from 'axios';
import { BASE_URL } from '../config/constant';

export class AdminService {
 
  static async hideArticleGlobally(articleId: string) {
    const response = await axios.post(`${BASE_URL}/admin/hide-article-global`, {
      articleId
    });
    return response.data;
  }

  static async hideCategory(categoryName: string) {
    const response = await axios.post(`${BASE_URL}/admin/hide-category`, {
      categoryName
    });
    return response.data;
  }

  static async filterArticlesByKeyword(keyword: string) {
    const response = await axios.post(`${BASE_URL}/admin/filter-keyword`, {
      keyword
    });
    return response.data;
  }

  
}
