import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { Article } from '../models/Article';
import { User } from '../models/User';

export class SavedArticlesService {
  static async save(user: User, article: Article) {
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
   const response = await axios.get(`${BASE_URL}/saved-articles?userId=${user.id}`);
    return response.data;
  }

  static async delete(user:User,article: Article) {
    await axios.delete(`${BASE_URL}/saved-articles/${user.id}/${article.article_id}`);    
  }
}
