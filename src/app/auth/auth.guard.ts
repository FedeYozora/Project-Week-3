import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authSrv: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authSrv.user$.pipe(
      take(1),
      map((utente) => {
        if (utente) {
          this.userService.setCurrentUser(utente);
          if (utente.user.role === 'admin') {
            return true;
          } else if (
            utente.user.role === 'user' &&
            state.url.includes('admin')
          ) {
            return this.router.createUrlTree(['/home']);
          } else {
            return true;
          }
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
