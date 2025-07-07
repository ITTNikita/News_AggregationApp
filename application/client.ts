import { AuthController } from '../controllers/AuthController';
import { askQuestion } from '../utils/readlineUtils';
import { logMessage } from '../logs/LogService';

export async function mainMenu() {
  while (true) {
    console.log('\nWelcome to the News Aggregator');
    console.log('1. Login');
    console.log('2. Sign Up');
    console.log('3. Exit');
    logMessage('Displaying main menu options');

    const choice = await askQuestion('Choose an option: ');

    switch (choice) {
      case '1':
        await AuthController.login();
        break;
      case '2':
        await AuthController.signup();
        break;
      case '3':
        console.log('logging out!');
        process.exit(0);
      default:
        console.log(' Invalid choice. Please enter 1, 2, or 3.');
    }
  }
}

mainMenu();
