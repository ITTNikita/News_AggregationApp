import { NotificationService } from '../services/NotificationService';
import { Notification } from '../models/Notification';
import { User } from '../models/User';
import { askQuestion } from '../utils/readlineUtils';
import { KeywordController } from './KeyWordController';

export class NotificationController {
  static async displayMenu(user: User) {
    while (true) {
      console.log('\n Notification Menu');
      console.log('1. View Notifications');
      console.log('2. Configure Keywords');
      console.log('3. Back');
      console.log('4. Logout');

      const choice = await askQuestion('Enter your choice (1-4): ');

      switch (choice) {
        case '1':
          await this.view(user);
          break;
        case '2':
            await this.configureNotifications(user);
         console.log("yes");
          break;
        case '3':
         console.log("back")
          return ;
        case '4':
          console.log("logging out")
         process.exit(0);
        default:
          console.log(' Invalid option');
      }
    }
  }

  static async view(user: User) {
    const notifications = await NotificationService.getNotifications(user);
    if (!notifications.length) {
      console.log(' No notifications');
      return;
    }

    console.log('\n Notifications:');
    notifications.forEach((n, i) => {
      console.log(`${i + 1}. ${n.message}-${n.timestamp} `);
    });
  }
    static async configureNotifications(user: User) {
  while (true) {
    console.log(`\nWelcome to News Application, ${user.username}!`);
    console.log('CONFIGURE NOTIFICATION');
    console.log('Choose the option below:');
    console.log('1. Business');
    console.log('2. Entertainment');
    console.log('3. Sports');
    console.log('4. Technology');
    console.log('5. Keywords');
    console.log('6. Back');
    console.log('7. Logout');

    const choice = await askQuestion('Enter your choice (1-7): ');

    switch (choice) {
      case '1':
        await this.setCategoryNotification(user.id, 'Business');
        break;
      case '2':
        await this.setCategoryNotification(user.id, 'Entertainment');
        break;
      case '3':
        await this.setCategoryNotification(user.id, 'Sports');
        break;
      case '4':
        await this.setCategoryNotification(user.id, 'Technology');
        break;
      case '5':
        await KeywordController.manageKeywords(user);
        break;
      case '6':
        return;
      case '7':
        console.log(' Logging out');
        process.exit(0);
      default:
        console.log(' Invalid option. Please choose between 1-7.');
    }
  }
}

private static async setCategoryNotification(userId: string, category: string) {
  const action = await askQuestion(`Do you want to ENABLE or DISABLE notifications for ${category}? (e/d): `);
  const isEnabled = action.toLowerCase() === 'e';

  const success = await NotificationService.setCategoryPreference(userId, category, isEnabled);
  if (success) {
    console.log(` ${category} notifications ${isEnabled ? 'enabled' : 'disabled'}.`);
  } else {
    console.log(` Failed to update ${category} notifications.`);
  }
}


private static async setKeywordNotifications(user: User) {
    console.log("set keyword notifications");
  const keyword = await askQuestion('Enter keyword to add: ');
        const added = await NotificationService.setCategoryPreference(user.id, keyword.trim(), true);
}


  

 

 
}
