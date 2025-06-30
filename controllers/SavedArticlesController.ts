import { SavedArticlesService } from '../services/SavedArticlesService';
import { Article } from '../models/Article';
import { User } from '../models/User';
import { askQuestion } from '../utils/readlineUtils';

export class SavedArticlesController {
  static async saveArticle(user:User, article: Article) {
    await SavedArticlesService.save(user, article);
  }

  static async viewArticles(user:User) {    
    const articles = await SavedArticlesService.getAll(user);
    if (!articles.length) {
      console.log(' No saved articles found.');
    } else {
      console.table(articles.map((a, i) => ({
        'ID': i + 1,
        'Title': a.title,
        'Source': a.source_name,
        'Description': a.description,
        'Category': a.category
      })));
    }
   while (true) {
        console.log('\nOptions:');
        console.log('1. Back');
        console.log('2. Logout');
        console.log('3. Delete Article');

        const option = await askQuestion('Choose an option: ');

        switch (option) {
         case '1':
            return;
          case '2':
            console.log(' Logging out...');
            process.exit(0);
         case '3':
            const articleId = await askQuestion('Enter ID to delete: ');
            const index = parseInt(articleId) - 1;
            console.log("index",index);
            
            if (articles[index]) {
             await this.deleteArticle(user, articles[index]);
              console.log(' Article deleted.');
            } else {
              console.log(' Invalid Article ID.');
            }
            break;
              
          default:
            console.log(' Invalid choice.');
        }
      }


  }

  static async deleteArticle(user:User,article:Article) {
    console.log("article",article);
    console.log("delete article",article.article_id);
    await SavedArticlesService.delete(user, article);
    console.log(' Article deleted.');
  }
}
