import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { logMessage } from '../logs/LogService';

export class NewsService {
  static async getTodayHeadlines(): Promise<Article[]> {
    logMessage("Fetching today's headlines");
    const response = await axios.get(`${BASE_URL}/news/today-articles`);
    return (response.data || []).map((article: any,index:number): any => ({
    article_id: article.id,
      title: article.title || 'N/A',
      description: (article.description || 'N/A').substring(0, 200),
      source_name: article.source?.name || 'N/A',
      url: article.url || 'N/A',
      category: article.category
    }));
  }


  static async getUserPreferenceData(user:User): Promise<Article[]> {
    logMessage(`Fetching user preference articles for user: ${user.id}`);
    const response = await axios.get(`${BASE_URL}/news/user-preference-articles`,{params:user});
    return (response.data || []).map((article: any,index:number): any => ({
    article_id: article.id,
      title: article.title || 'N/A',
      description: (article.description || 'N/A').substring(0, 200),
      source_name: article.source?.name || 'N/A',
      url: article.url || 'N/A',
      category: article.category
    }));
  }

  static async getHeadlinesByDateRange(from: string, to: string, category: string): Promise<Article[]> {
    logMessage(`Fetching headlines from ${from} to ${to} for category: ${category}`);
    console.log("getHeadlinesByDateRange function");
    const response = await axios.get(`${BASE_URL}/news/articles`, {
    params: {
      from,
      to,
      category
    }
    });
    console.log("response in getHeadlinesByDateRange",response.data);
    return (response.data || []).map((article: any,index:string): Article => ({
      article_id: article.id,
      title: article.title || 'N/A',
      description: (article.description || 'N/A').substring(0, 250),
      source_name: article.source?.name || 'N/A',
      url: article.url || 'N/A',
      category: category,
    }));
  }
}
