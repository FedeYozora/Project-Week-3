import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

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

  getUserFromLocalStorage(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`);
  }

  delUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiURL}/users/${id}`);
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/posts`);
  }
}
