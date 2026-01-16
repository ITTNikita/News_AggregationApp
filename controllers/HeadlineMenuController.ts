import { User } from '../models/User';
import {askQuestion} from '../utils/readlineUtils';
import { NewsController } from './NewsController';

export class HeadlineMenuController {
  static async display(user:User) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
 

    console.log(`\nWelcome to the News Application, ${user.username}! Date: ${formattedDate}`);
    console.log("Please choose the option below:");
    console.log("1. Today");
    console.log("2. Date Range");
    console.log("3. Logout");

    const choice =  await askQuestion('\nEnter your choice (1-3): ');
    switch (choice) {
      case '1':
        await NewsController.showTodayHeadlines(user);
        break;
      case '2':
        await NewsController.showHeadlinesByDateRange(user);
        break;
      case '3':
        console.log(" Logging out...");
        process.exit(0); 
      default:
        console.log(" Invalid choice. Please enter a number between 1 and 3.");
    }
  }
}
