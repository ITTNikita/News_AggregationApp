import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { logMessage } from '../logs/LogService';

export class SavedArticlesService {
  static async save(user: User, article: Article) {
    logMessage(`Saving article for user ${user.id}: ${article.title}`);
    await axios.post(`${BASE_URL}/saved-articles`, {
      user_id: user.id,
      article_id: article.article_id,
      title: article.title,
      description: article.description,
      source_name: article.source_name,
      url: article.url,
      category: article.category
    });
  }

  static async getAll(user:User): Promise<Article[]> {
    logMessage(`Fetching saved articles for user: ${user.id}`);
   const response = await axios.get(`${BASE_URL}/saved-articles?userId=${user.id}`);
    return response.data;
  }

  static async delete(user:User,article: Article) {
    logMessage(`Deleting saved article for user ${user.id}: ${article.title}`);
    await axios.delete(`${BASE_URL}/saved-articles/${user.id}/${article.article_id}`);    
  }
}
