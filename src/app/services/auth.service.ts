import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ADMIN_SESSION_KEY = 'legal_brain_admin_auth';
  private readonly _isAdmin = signal<boolean>(this.checkInitialAuth());

  readonly isAdmin = this._isAdmin.asReadonly();

  private checkInitialAuth(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.ADMIN_SESSION_KEY) === 'true';
    }
    return false;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'Admin123') {
      this._isAdmin.set(true);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.ADMIN_SESSION_KEY, 'true');
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this._isAdmin.set(false);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(this.ADMIN_SESSION_KEY);
    }
  }
}
