import { Injectable } from '@angular/core';
import { Base64Service } from './base64.service';

export interface Credentials {
  id: string;
  email: string;
  password: string;
}

@Injectable()
export class CredentialsService {
  private readonly LOCAL_STORAGE_KEY = 'USER';

  constructor(
    private base64: Base64Service
  ) {
  }

  public authorize(user: {
    id: string,
    email: string,
    password: string,
  }): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(user));
  }

  public logout(): void {
    return localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }

  public isAuthorized(): boolean {
    return !!localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  public extractCredentials(): Credentials {
    const json = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));

    return {
      id: json ? (json.id ?? null) : null,
      email: json ? (json.email ?? null) : null,
      password: json ? (json.password ?? null) : null,
    };
  }

  public makeBasicToken(): string {
    const credentials = this.extractCredentials();
    return this.base64.encode(`${credentials.email}:${credentials.password}`);
  }
}

