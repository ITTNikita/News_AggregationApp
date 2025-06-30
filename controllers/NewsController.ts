/*import {  NewsService } from '../services/NewsService';
import { askQuestion } from '../utils/readlineUtils';
import { SavedArticlesController } from '../controllers/SavedArticlesController';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { FeedBackController } from './FeedBackController';

export class NewsController {
  static async showTodayHeadlines(user:User) {
    try {
      const articles = await NewsService.getTodayHeadlines();    
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
        console.log('3. Like/Dislike Articles');
        console.log('4. Report the article');
        console.log('5. Logout');

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
          case '3': await FeedBackController.likeAndDisLikeArticle(user);         
          return; 
          case '4' : await FeedBackController.reportArticle(user);
          console.log("report the article");
          break; 
          case '5':
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
      const selectedCategory = categoryMap[categoryChoice];

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
        console.log('3. Like/Dislike Articles');
        console.log('4. Report the article');
        console.log('5. Logout');

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
          case '3':await FeedBackController.likeAndDisLikeArticle(user); 
                break;
          case '4':await FeedBackController.reportArticle(user);
                    console.log("report the article");
                     break; 
          case '5':console.log(' Logging out...');
            process.exit(0);
            
          default:
            console.log(' Invalid choice.');
        }
      }
    } catch (error: any) {
      console.error(' Error fetching today\'s headlines:', error.message);
    }
  }

  static async showUserPreferenceNewsArticles(user:User) {
    try {
      console.log("testing show user prefernce articles");
      const articles = await NewsService.getUserPreferenceData(user);    
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
        console.log('3. Like/Dislike Articles');
        console.log('4. Report the article');
        console.log('5. Logout');

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
          case '3': await FeedBackController.likeAndDisLikeArticle(user);         
          return; 
          case '4' : await FeedBackController.reportArticle(user);
          console.log("report the article");
          break; 
          case '5':
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
}
*/
import { NewsService } from '../services/NewsService';
import { askQuestion } from '../utils/readlineUtils';
import { SavedArticlesController } from './SavedArticlesController';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { FeedBackController } from './FeedBackController';

export class NewsController {
  static async showTodayHeadlines(user: User) {
    try {
      const articles = await NewsService.getTodayHeadlines();
      NewsController.displayArticles(articles);

      await NewsController.handleUserOptions(user, articles);
    } catch (error: any) {
      console.error("Error fetching today’s headlines:", error.message);
    }
  }

  static async showHeadlinesByDateRange(user: User) {
    try {
      const startDate = await askQuestion("Enter start date (YYYY-MM-DD): ");
      const endDate = await askQuestion("Enter end date (YYYY-MM-DD): ");

      const category = await NewsController.selectCategory();
      const articles = await NewsService.getHeadlinesByDateRange(startDate, endDate, category);

      if (!articles.length) {
        console.log("No articles found for the selected range and category.");
        return;
      }

      NewsController.displayArticles(articles);
      await NewsController.handleUserOptions(user, articles);
    } catch (error: any) {
      console.error("Error fetching headlines:", error.message);
    }
  }

  static async showUserPreferenceNewsArticles(user: User) {
    try {
      const articles = await NewsService.getUserPreferenceData(user);
      NewsController.displayArticles(articles);

      await NewsController.handleUserOptions(user, articles);
    } catch (error: any) {
      console.error("Error fetching user preference headlines:", error.message);
    }
  }

  private static displayArticles(articles: Article[]) {
    console.table(
      articles.map((article, index) => ({
        ID: index + 1,
        ArticleID: article.article_id,
        Title: article.title,
        Description: article.description,
        URL: article.url,
        Source: article.source_name,
        Category: article.category,
        SavedAt: article.saved_at || 'N/A',
      }))
    );
  }

  private static async handleUserOptions(user: User, articles: Article[]) {
    while (true) {
      console.log('\nOptions:');
      console.log('1. Save Article');
      console.log('2. Back');
      console.log('3. Like/Dislike Article');
      console.log('4. Report Article');
      console.log('5. Logout');

      const option = await askQuestion('Choose an option: ');

      switch (option) {
        case '1':
          await NewsController.saveArticle(user, articles);
          break;
        case '2':
          return;
        case '3':
          await FeedBackController.likeAndDisLikeArticle(user);
          break;
        case '4':
          await FeedBackController.reportArticle(user);
          console.log("Article reported.");
          break;
        case '5':
          console.log("Logging out...");
          process.exit(0);
        default:
          console.log("Invalid choice.");
      }
    }
  }

  private static async saveArticle(user: User, articles: Article[]) {
    const id = await askQuestion('Enter ID to save: ');
    const index = parseInt(id) - 1;

    if (articles[index]) {
      await SavedArticlesController.saveArticle(user, articles[index]);
      console.log('Article saved.');
    } else {
      console.log('Invalid Article ID.');
    }
  }

  private static async selectCategory(): Promise<string> {
    console.log("\nChoose a category:");
    console.log("1. All");
    console.log("2. Business");
    console.log("3. Entertainment");
    console.log("4. Sports");
    console.log("5. Technology");

    const categoryChoice = await askQuestion("Select an option (1-5): ");
    const categoryMap: Record<string, string> = {
      '1': 'general',
      '2': 'business',
      '3': 'entertainment',
      '4': 'sports',
      '5': 'technology',
    };

    return categoryMap[categoryChoice] || 'general';
  }
}
