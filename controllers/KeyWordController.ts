import { askQuestion } from '../utils/readlineUtils';
import { NotificationService } from '../services/NotificationService';
import { User } from '../models/User';

export class KeywordController {
  static async manageKeywords(user: User) {
    while (true) {
      console.log('\n Keyword Management');
      console.log('1. View Keywords');
      console.log('2. Add Keyword');
      console.log('3. Enable/Disable Keyword');
      console.log('4. Back');

      const choice = await askQuestion('Enter your choice (1-4): ');

      switch (choice) {
        case '1':
          await this.viewKeywords(user);
          break;
        case '2':
          await this.addKeyword(user);
          break;
        case '3':
          await this.updateKeywordStatus(user);
          break;  
        case '4':
          return;
        default:
          console.log(' Invalid choice. Please select 1-4.');
      }
    }
  }

  private static async viewKeywords(user: User) {
    console.log("view Notification");
    const keywords = await NotificationService.getUserKeywords(user.id);
    if (!keywords.length) {
      console.log(' No keywords added.');
      return;
    }

    console.log('\nYour Keywords:');
    keywords.forEach((k: { keyword: string; is_enabled: number }, i: number) => {
        console.log("k",k.keyword,k.is_enabled)
      console.log(`${i + 1}. ${k.keyword} (${k.is_enabled ? ' Enabled' : ' Disabled'})`);
    });
  }

  private static async addKeyword(user: User) {
    const keyword = await askQuestion('Enter keyword to add: ');
    const success = await NotificationService.addKeyword(user.id, keyword.trim());
    console.log(success ? 'Keyword added.' : ' Failed to add keyword.');
  }

  private static async updateKeywordStatus(user: User) {
    const keyword = await askQuestion('Enter keyword to enable/disable: ');
    const isEnable = await askQuestion('Do you want to ENABLE or DISABLE it? (1/0): ');
    const status = await NotificationService.updateKeywordStatus(user.id, keyword.trim(),isEnable);
    if (status === true) {
      console.log(' Keyword enabled.');
    } else if (status === false) {
      console.log(' Keyword disabled.');
    } else {
      console.log(' Keyword not found.');
    }
  } 
}
