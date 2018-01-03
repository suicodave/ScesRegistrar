import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return true;
  }


  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token: string | boolean = this.authService.checkToken();

    // tslint:disable-next-line:triple-equals
    if (token == false) {
      this.router.navigate(['auth'], { queryParams: { lastVisit: state.url } });
      return token;
    }

    return true;
  }



}
