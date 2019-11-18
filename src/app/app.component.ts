import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store/app.reducer';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  public ngOnInit() {
    this.store.dispatch(AuthActions.loadAuth());

  }
}
