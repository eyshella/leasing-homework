import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {

  }

  public onClickSignOut() {
    this.store.dispatch(AuthActions.clearAuths());
    this.router.navigateByUrl('/public/signin')
  }

  public onClickAppInfo(){
    alert(`
      Система управления для лизинговой компании
      Автор: Рагозина Мария Максимовна
      Организация: СПБГЭУ
    `)
  }
}
