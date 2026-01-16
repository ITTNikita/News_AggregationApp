import { User } from "../models/User";
import {NewsController} from './NewsController';
export class UserPreferenceController {
  static async display(user:User) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    console.log(`\nWelcome to the News Application, ${user.username}! Date: ${formattedDate}`);
    await NewsController.showUserPreferenceNewsArticles(user);
       
        
  }
}
