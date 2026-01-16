import { NotificationService } from '../services/NotificationService';
import { User } from '../models/User';
import { askQuestion } from '../utils/readlineUtils';
import { KeywordController } from './KeyWordController';

export class NotificationController {

  static async displayMenu(user: User): Promise<void> {
    while (true) {
      console.log('\nNotification Menu');
      console.log('1. View Notifications');
      console.log('2. Configure Notifications');
      console.log('3. Back');
      console.log('4. Logout');

      const choice = await askQuestion('Enter your choice (1-4): ');

      switch (choice) {
        case '1':
          await this.viewNotifications(user);
          break;
        case '2':
          await this.configureNotifications(user);
          break;
        case '3':
          return;
        case '4':
          console.log('Logging out...');
          process.exit(0);
        default:
          console.log('Invalid option. Please enter a number between 1 and 4.');
      }
    }
  }

  private static async viewNotifications(user: User): Promise<void> {
    try {
      const notifications = await NotificationService.getNotifications(user);
      if (!notifications.length) {
        console.log('No notifications.');
        return;
      }

      console.log('\nNotifications:');
      notifications.forEach((n, i) => {
        console.log(`${i + 1}. ${n.message} - ${n.timestamp}`);
      });
    } catch (error: any) {
      console.error('Error fetching notifications:', error.message);
    }
  }

  private static async configureNotifications(user: User): Promise<void> {
    while (true) {
      console.log(`\nConfigure Notifications for ${user.username}`);
      console.log('1. Business');
      console.log('2. Entertainment');
      console.log('3. Sports');
      console.log('4. Technology');
      console.log('5. Manage Keywords');
      console.log('6. Back');
      console.log('7. Logout');

      const choice = await askQuestion('Enter your choice (1-7): ');

      const categoryMap: Record<string, string> = {
        '1': 'Business',
        '2': 'Entertainment',
        '3': 'Sports',
        '4': 'Technology'
      };

      if (categoryMap[choice]) {
        await this.toggleCategoryNotification(user.id, categoryMap[choice]);
      } else {
        switch (choice) {
          case '5':
            await KeywordController.manageKeywords(user);
            break;
          case '6':
            return;
          case '7':
            console.log('Logging out...');
            process.exit(0);
          default:
            console.log('Invalid option. Please choose between 1 and 7.');
        }
      }
    }
  }

  private static async toggleCategoryNotification(userId: string, category: string): Promise<void> {
    const action = await askQuestion(`Do you want to ENABLE or DISABLE notifications for ${category}? (e/d): `);
    const isEnabled = action.toLowerCase() === 'e';

    try {
      const success = await NotificationService.setCategoryPreference(userId, category, isEnabled);
      if (success) {
        console.log(`${category} notifications ${isEnabled ? 'enabled' : 'disabled'}.`);
      } else {
        console.log(`Failed to update ${category} notifications.`);
      }
    } catch (error: any) {
      console.error(`Error updating ${category} notifications:`, error.message);
    }
  }
}
