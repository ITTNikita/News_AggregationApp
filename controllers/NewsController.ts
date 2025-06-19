import {  NewsService } from '../services/NewsService';
import { askQuestion } from '../utils/readlineUtils';
import { SavedArticlesController } from '../controllers/SavedArticlesController';
import { Article } from '../models/Article';
import { User } from '../models/User';

export class NewsController {
  static async showTodayHeadlines(user:User) {
    console.log("user in newsController",user);
    try {
      const articles = await NewsService.getTodayHeadlines();
      console.log("\nToday's Headlines:",articles);
    
      console.table(articles.map((article: any, i: number) => ({
        'Id': i + 1,
        'ArticleID': article.article_id,
        'Title': article.title,
        'Description': article.description,
        'URL': article.url,
        'Source': article.source_name,
        'Category': article.category,
      })));

      while (true) {
        console.log('\nOptions:');
        console.log('1. Save Article');
        console.log('2. Back');
        console.log('3. Logout');

        const option = await askQuestion('Choose an option: ');

        switch (option) {
          case '1':
            const articleId = await askQuestion('Enter ID to save: ');
            const index = parseInt(articleId) - 1;
            if (articles[index]) {
              await SavedArticlesController.saveArticle(user, articles[index]);
              console.log(' Article saved.');
            } else {
              console.log(' Invalid Article ID.');
            }
            break;
          case '2':
            return;
          case '3':
            console.log(' Logging out...');
            process.exit(0);
          default:
            console.log(' Invalid choice.');
        }
      }
    } catch (error: any) {
      console.error('Error fetching today\'s headlines:', error.message);
    }
  }

  static async showHeadlinesByDateRange(user:User) {
    try {
      const startDate = await askQuestion("Enter start date (YYYY-MM-DD): ");
      const endDate = await askQuestion("Enter end date (YYYY-MM-DD): ");

      console.log("\nChoose a category:");
      console.log("1. All");
      console.log("2. Business");
      console.log("3. Entertainment");
      console.log("4. Sports");
      console.log("5. Technology");
      const categoryChoice = await askQuestion("Select an option (1-5): ");

      const categoryMap: { [key: string]: string } = {
        '1': 'general',
        '2': 'business',
        '3': 'entertainment',
        '4': 'sports',
        '5': 'technology'
      };
      const selectedCategory = categoryMap[categoryChoice] || 'general';

      const articles = await NewsService.getHeadlinesByDateRange(startDate, endDate, selectedCategory);
      
      if (!articles.length) {
        console.log(" No articles found for the selected range and category.");
        return;
      }

      console.table(articles.map((article:Article, i: number) => ({
     ID: i + 1,
    ArticleID: article.article_id,
    Title: article.title,
    Description: article.description,
    Source: article.source_name,
    URL: article.url,
    Category: article.category,
    SavedAt: article.saved_at || 'N/A'
      })));

     while (true) {
        console.log('\nOptions:');
        console.log('1. Save Article');
        console.log('2. Back');
        console.log('3. Logout');

        const option = await askQuestion('Choose an option: ');

        switch (option) {
          case '1':
            const articleId = await askQuestion('Enter ID to save: ');
            const index = parseInt(articleId) - 1;
            if (articles[index]) {
              await SavedArticlesController.saveArticle(user, articles[index]);
              console.log(' Article saved.');
            } else {
              console.log(' Invalid Article ID.')
            }
            break;
          case '2':
            return;
          case '3':
            console.log(' Logging out...');
            process.exit(0);
          default:
            console.log(' Invalid choice.');
        }
      }
    } catch (error: any) {
      console.error(' Error fetching today\'s headlines:', error.message);
    }
  }
}
