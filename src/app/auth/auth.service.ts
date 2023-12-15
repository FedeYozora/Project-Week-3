import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, tap, catchError, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BannedMail } from '../models/banned-mail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  apiURL = environment.apiURL;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.apiURL}/login`, data).pipe(
      tap((loggato) => {
        this.authSubj.next(loggato);
        this.utente = loggato;
        localStorage.setItem('user', JSON.stringify(loggato));
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['login']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['login']);
      return;
    }
    this.authSubj.next(userData);
    this.router.navigate(['/']);
  }

  register(data: {
    nome: string;
    cognome: string;
    email: string;
    password: string;
    genre: string;
    role: string;
    city: string;
  }) {
    return this.http.post(`${this.apiURL}/register`, data).pipe(
      tap(() => {
        this.router.navigate(['login']), catchError(this.errors);
      })
    );
  }

  updateUserInfo(updatedInfo: any, id: number) {
    return this.http.patch(`${this.apiURL}/users/${id}`, updatedInfo).pipe(
      tap(() => {
        this.utente = { ...updatedInfo };
      }),
      catchError(this.errors)
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  private errors(err: any) {
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }

  checkEmail(): Observable<BannedMail[]> {
    return this.http.get<BannedMail[]>(`${this.apiURL}/bannedUsers`);
  }
}
