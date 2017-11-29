import { Injectable } from '@angular/core';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service'

@Injectable()
export class AuthService implements CanActivate {

  constructor(
     private userService: UserService,
     private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.userService.isAuthenticated()) {
      if (state.url === "/register"){
        this.router.navigate(['/']);
        return false;
      }
    } else {
      if (state.url !== "/register") {
        this.router.navigate(['/register']);
        return false;
      }
    }

    return true;
  }
}
