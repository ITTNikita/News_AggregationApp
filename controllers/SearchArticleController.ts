import { SearchService } from '../services/SearchService';
import { SavedArticlesController } from './SavedArticlesController';
import { User } from '../models/User';
import { askQuestion } from '../utils/readlineUtils';

export class SearchArticleController {
  static async search(user: User): Promise<void> {
    try {
      const searchText = await askQuestion('Enter your search text: ');
      const startDate = await askQuestion('Enter start date (YYYY-MM-DD): ');
      const endDate = await askQuestion('Enter end date (YYYY-MM-DD): ');

      const results = await SearchService.searchArticles(searchText, startDate, endDate);

      if (!results.length) {
        console.log('No matching articles found.');
        return;
      }

      SearchArticleController.displaySearchResults(user.username, results);
      await SearchArticleController.handleUserOptions(user, results);

    } catch (error: any) {
      console.error('Error while searching articles:', error.message);
    }
  }

  private static displaySearchResults(username: string, results: any[]): void {
    console.log(`\nWelcome ${username}! Date: ${new Date().toLocaleDateString()}`);
    console.log('\nSEARCH RESULTS:\n');

    console.table(
      results.map((article, index) => ({
        ID: index + 1,
        ArticleId: article.id,
        Title: article.title,
        Date: new Date(article.publishedAt || article.date).toLocaleDateString(),
        Likes: article.like_count,
        Dislikes: article.dislike_count,
        Source: article.source_name,
        URL: article.url,
        Description: article.description,
      }))
    );
  }

  private static async handleUserOptions(user: User, results: any[]): Promise<void> {
    while (true) {
      console.log('\nOptions:');
      console.log('1. Save Article');
      console.log('2. Back');
      console.log('3. Logout');

      const option = await askQuestion('Choose an option: ');

      switch (option) {
        case '1':
          await this.saveArticle(user, results);
          break;
        case '2':
          return;
        case '3':
          console.log('Logging out...');
          process.exit(0);
        default:
          console.log('Invalid choice.');
      }
    }
  }

  private static async saveArticle(user: User, results: any[]): Promise<void> {
    const input = await askQuestion('Enter index to save: ');
    const index = parseInt(input);

    if (results[index - 1]) {
      await SavedArticlesController.saveArticle(user, results[index - 1]);
      console.log('Article saved.');
    } else {
      console.log('Invalid Article ID.');
    }
  }
}
