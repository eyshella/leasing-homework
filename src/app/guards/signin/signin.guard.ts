import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { AuthInfo } from 'src/app/models/auth-info';
import { AppState, selectAuthState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../store/auth/auth.actions';


@Injectable()
export class SignInGuard implements CanActivate {
  public authInfo: AuthInfo = null;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.select(selectAuthState).subscribe(data => {
      this.authInfo = data;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authInfo != null && moment(this.authInfo.expirationDate).isValid && moment(this.authInfo.expirationDate).isAfter(moment())) {

      this.router.navigateByUrl('private/menu');
      return false;
    }

    return true;
  }
}