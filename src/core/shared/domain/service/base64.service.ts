import { Injectable } from '@angular/core';

@Injectable()
export class Base64Service {
  public encode(str: string): string {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1): string {
        return String.fromCharCode(Number('0x' + p1));
      }));
  }

  public decode(str: string): string {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }
}
