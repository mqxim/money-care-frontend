import Base64 from '../../../../app/utils/Base64';
import { Injectable } from '@angular/core';

export interface Credentials {
  id: string;
  email: string;
  password: string;
}

@Injectable()
export class CredentialsService {
  private readonly LOCAL_STORAGE_KEY = 'USER';

  public authorize(user: {
    id: string,
    email: string,
    password: string,
  }): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(user));
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
    return Base64.encode(`${credentials.email}:${credentials.password}`);
  }
}

