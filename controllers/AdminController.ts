import { askQuestion } from '../utils/readlineUtils';
import { ExternalServerController } from './ExternalServerController';

export class AdminController {
  static async displayAdminMenu(userName: string) {
    while (true) {
      this.displayHeader(userName);
      this.displayOptions();
      
      const choice = await askQuestion('\nEnter your choice (1-5): ');
      const shouldContinue = await this.handleMenuChoice(choice);

      if (!shouldContinue) break;
    }
  }

  private static displayHeader(userName: string) {
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

    console.log(`\nWelcome Admin, ${userName}!`);
    console.log(` Date: ${formattedDate}    Time: ${formattedTime}`);
  }

  private static displayOptions() {
    console.log('\n Admin Menu:');
    console.log('1. View the list of external servers and statuses');
    console.log('2. View the External Server Details');
    console.log('3. Update/Edit External Server Details');
    console.log('4. Add News Category');
    console.log('5. Logout');
  }

  private static async handleMenuChoice(choice: string): Promise<boolean> {
    switch (choice) {
      case '1':
        await ExternalServerController.showStatuses();
        break;
      case '2':
        await ExternalServerController.showDetails();
        break;
      case '3':
        await ExternalServerController.updateDetails();
        break;
      case '4':
        await ExternalServerController.addNewCategory();
        break;
      case '5':
        console.log('Logging out');
        return false;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 5');
    }
    return true;
  }
}
