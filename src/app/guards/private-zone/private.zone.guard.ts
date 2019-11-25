import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthInfo } from 'src/app/models/auth-info';
import { AppState, selectAuthState } from 'src/app/store/app.reducer';
import * as moment from 'moment'
@Injectable()
export class PrivateZoneGuard implements CanActivate {
  public authInfo: AuthInfo = null;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.select(selectAuthState).subscribe(data => {
      this.authInfo = data;
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authInfo == null ||
      this.authInfo.expirationDate == null ||
      !moment(this.authInfo.expirationDate).isValid ||
      moment(this.authInfo.expirationDate).isBefore(moment())) {

      this.router.navigateByUrl('/public/signin')
      return false;
    }

    return true;
  }
}