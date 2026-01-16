import {askQuestion, askQuestionHidden} from '../utils/readlineUtils';

export class InputService {
  static async askUsername(): Promise<string> {
    return await askQuestion("Enter username: ");
  }

  static async askEmail(): Promise<string> {
    return await askQuestion("Enter email: ");
  }

  static async askPassword(): Promise<string> {
    return await askQuestionHidden("Enter password: ");
  }
}
