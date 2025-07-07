import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { Article } from '../models/Article';
import { logMessage } from '../logs/LogService';

export class SearchService {
  static parseDate(dateStr: string): string {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return "Invalid Date";
    return `${year}-${month}-${day}`;
  }

  static async searchArticles(searchText: string,from: string,to: string): Promise<Article[]> {
    console.log("Searching articles with text:", searchText);
    const response = await axios.get(`${BASE_URL}/news/all-articles`, {
      params: { from, to },
    });

    const articles = response.data || [];
    const keyword = searchText.toLowerCase();

    const filteredArticles = articles.filter((article: any) => {
      const title = article.title?.toLowerCase() || '';
      const description = article.description?.toLowerCase() || '';
      const url = article.url?.toLowerCase() || '';
      return title.includes(keyword) || description.includes(keyword) || url.includes(keyword);
    });
    logMessage(`Found ${filteredArticles.length} articles matching search text: ${searchText}`);
    return filteredArticles;
  }
}
