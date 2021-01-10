import Base64 from '../utils/Base64';
import {Injectable} from '@angular/core';

@Injectable()
export default class TokenService {
  public static extractCredentialsFromToken(token: string): { email: string, password: string } {
    const split = Base64.decode(token).split(':', 2);

    if (split.length !== 2) {
      throw new Error('Failed to extract token');
    }

    return {
      email: split[0],
      password: split[1]
    };
  }

  public static saveToken(email: string, password: string): void {
    localStorage.setItem('token', Base64.encode(`${email}:${password}`));
  }

  public static getToken(): string|null
  {
    return localStorage.getItem('token');
  }

  public static hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public static deleteToken(): void {
    localStorage.removeItem('token');
  }

  public static changePassword(password: string): void {
    const token = this.extractCredentialsFromToken(this.getToken());
    this.saveToken(token.email, password);
  }
}
