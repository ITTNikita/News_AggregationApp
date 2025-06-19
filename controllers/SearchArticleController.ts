import { SearchService } from '../services/SearchService';
import { SavedArticlesController } from '../controllers/SavedArticlesController';
import { User } from '../models/User';
import { askQuestion } from '../utils/readlineUtils';

export class SearchArticleController {
  static async search(user: User) {
    const searchText = await askQuestion("Enter your search text: ");
    const startDate = await askQuestion("Enter start date (YYYY-MM-DD): ");
    const endDate = await askQuestion("Enter end date (YYYY-MM-DD): ");

    try {
      const results = await SearchService.searchArticles(searchText, startDate, endDate);

      if (results.length === 0) {
        console.log(" No matching articles found.");
        return;
      }

      console.log(`\n Welcome ${user.username}! Date: ${new Date().toLocaleDateString()}`);
      console.log(`\n SEARCH RESULTS:\n`);
      console.table(
        results.map((article: any, index: number) => ({
          ArticleId: index + 1,
          Title: article.title,
          Date: new Date(article.publishedAt || article.date).toLocaleDateString(),
          Likes: article.likes,
          Dislikes: article.dislikes,
          Source: article.source_name ,
          URL: article.url,
          Description: article.description,

        }))
      );

      while (true) {
        console.log('\nOptions:');
        console.log('1. Save Article');
        console.log('2. Back');
        console.log('3. Logout');

        const option = await askQuestion('Choose an option: ');

        switch (option) {
          case '1':
            const articleId = await askQuestion('Enter Article ID to save: ');
            const index = parseInt(articleId);
            if (!isNaN(index) && results[index - 1]) {
              await SavedArticlesController.saveArticle(user, results[index - 1]);
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
      console.error(" Error while searching articles:", error.message);
    }
  }
}
