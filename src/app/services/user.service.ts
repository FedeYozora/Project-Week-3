import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiURL;
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/${id}`);
  }
}
