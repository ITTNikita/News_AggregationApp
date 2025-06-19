import { askQuestion } from '../utils/readlineUtils';
import { HeadlineMenu } from './HeadlineMenuController';
import { User } from '../models/User'; 
import { SavedArticlesController } from './SavedArticlesController';
import { NotificationController } from './NotificationController'; 
import { SearchArticleController } from './SearchArticleController';

export class UserController {
  static async displayUserMenu(user:User) {
    while (true) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      console.log(`\n Welcome to the News Application, ${user.username}!`);
      console.log(` Date: ${formattedDate}  Time: ${formattedTime}`);
      console.log('\n Please choose the option below:');
      console.log('1. Headlines');
      console.log('2. Saved Articles');
      console.log('3. Search');
      console.log('4. Notifications');
      console.log('5. Logout');

      const choice = await askQuestion('\nEnter your choice (1-5): ');

      switch (choice) {
        case '1':
          await HeadlineMenu.display(user);
          break;
        case '2':
          console.log('Fetching saved articles...');
          await SavedArticlesController.viewArticles(user);
         
          break;
        case '3':          
         await SearchArticleController.search(user);
          break;
        case '4':
          console.log('Notifications');
          await NotificationController.displayMenu(user);
          console.log("testing abcdefghiz");
          break;
        case '5':
          console.log('Logging out...');
          return;
        default:
          console.log(' Invalid choice. Please enter a number between 1 and 5.');
      }
    }
  }
}
