import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { Article } from '../models/Article';
export class NewsService {
  static async getTodayHeadlines(): Promise<Article[]> {
    console.log("todayHeadline function");
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

  static async getHeadlinesByDateRange(from: string, to: string, category: string): Promise<Article[]> {
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
