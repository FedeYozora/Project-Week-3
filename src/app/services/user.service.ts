import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser: User | null = null;

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  getCurrentUser(): any | null {
    return this.currentUser;
  }

  getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
