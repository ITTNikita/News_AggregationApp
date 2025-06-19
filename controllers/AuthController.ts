import { AuthService } from '../services/AuthService';
import { InputService } from '../services/InputService';
import { AdminController } from './AdminController';
import { UserController } from '../controllers/UserController';

export class AuthController {
  static async login() {
    const username = await InputService.askUsername();
    const password = await InputService.askPassword();
    const user = await AuthService.login(username, password);
    if (!user) return;

    if (user.role === 'admin') {
      await AdminController.displayAdminMenu(user);
    } else {
      await UserController.displayUserMenu(user);
    }
  }

  static async signup() {
    const userName = await InputService.askUsername();
    const email = await InputService.askEmail();
    const password = await InputService.askPassword();
    await AuthService.signup(userName, email, password);
  }
}
