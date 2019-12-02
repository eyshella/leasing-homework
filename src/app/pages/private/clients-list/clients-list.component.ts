import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Client } from 'src/app/models/client';
import { AppState, selectClientState } from 'src/app/store/app.reducer';

import * as fromClients from '../../../store/client/client.reducer';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  public clients: Client[] = [];

  @Input()
  public set sort(v: boolean) {
    this._sort = v;
    this.processSort();
  }

  private _sort: boolean = false

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectClientState),
        select(fromClients.selectAll)
      )
      .subscribe(data => {
        this.clients = data;
        this.processSort();
      });
  }

  public openClientOnClick(id: number) {
    this.router.navigateByUrl(`/private/client/${id}`);
  }


  private processSort() {
    if (this.clients.length === 0) {
      return
    }

    this.clients  = this.clients.sort((a, b) => {
      if (a.name < b.name) {
        return this._sort ? 1 : -1;
      }
      if (a.name === b.name) {
        return 0;
      }
      if (a.name > b.name) {
        return this._sort ? -1 : 1;
      }
      return 0;
    })
  }
}
