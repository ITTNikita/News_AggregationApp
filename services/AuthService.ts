import axios from 'axios';
import { BASE_URL } from '../config/constant';
import { isValidEmail } from '../utils/validation';

export class AuthService {
  static async login(username: string, password: string) {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, { username, password });
      return response.data.user;
    } catch (error: any) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      return null;
    }
  }

  static async signup(userName: string, email: string, password: string) {
    console.log('Signing up with:', { userName, email });
    if (!isValidEmail(email)) {
      console.log('Invalid email format.');
      return;
    }
    console.log('Valid email format. Proceeding with signup');
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, { userName, userEmail: email, password });
      console.log(response.data.message);
    } catch (error: any) {
      console.error(' Signup failed:', error.response?.data?.message || error.message);
    }
  }
}
