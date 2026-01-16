import { askQuestion } from '../utils/readlineUtils';
import { HeadlineMenuController } from './HeadlineMenuController';
import { User } from '../models/User';
import { SavedArticlesController } from './SavedArticlesController';
import { NotificationController } from './NotificationController';
import { SearchArticleController } from './SearchArticleController';
import { UserPreferenceController } from './UserPreferenceController';

export class UserController {
  static async displayUserMenu(user: User) {
    while (true) {
      this.displayHeader(user);
      this.displayMenuOptions();

      const choice = await askQuestion('\nEnter your choice (1-6): ');
      const isExit = await this.handleUserChoice(choice, user);

      if (isExit) break;
    }
  }

  private static displayHeader(user: User): void {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    console.log(`\nWelcome to the News Application, ${user.username}!`);
    console.log(`Date: ${date}  Time: ${time}`);
  }

  private static displayMenuOptions(): void {
    console.log('\nPlease choose an option below:');
    console.log('1. Headlines');
    console.log('2. Saved Articles');
    console.log('3. Search');
    console.log('4. Notifications');
    console.log('5. User Preference');
    console.log('6. Logout');
  }

  private static async handleUserChoice(choice: string, user: User): Promise<boolean> {
    switch (choice) {
      case '1':
        await HeadlineMenuController.display(user);
        break;
      case '2':
        await SavedArticlesController.viewArticles(user);
        break;
      case '3':
        await SearchArticleController.search(user);
        break;
      case '4':
        await NotificationController.displayMenu(user);
        break;
      case '5':
        await UserPreferenceController.display(user);
        break;
      case '6':
        console.log('Logging out...');
        return true;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 6.');
    }
    return false;
  }
}
