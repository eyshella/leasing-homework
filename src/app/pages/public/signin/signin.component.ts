import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public email: string = '';
  public password: string = '';

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(AuthActions.clearAuths());
  }

  public onSubmit(e: Event) {
    e.preventDefault();

    if (this.password === environment.userPassword && this.email === environment.userEmail) {
      this.store.dispatch(AuthActions.upsertAuth({
        auth: {
          expirationDate: moment().add(3,'day').format(),
          token: 'test_token',
          user: {
            email: this.email,
            id: 1,
            name: 'Jone Smith'
          }
        }
      }));

      this.router.navigateByUrl('/private/menu')
    } else {
      alert('Неправильные имя пользователя или пароль.');
    }
  }

}
