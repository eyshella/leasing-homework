import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Client } from 'src/app/models/client';
import { AppState, selectClientState } from 'src/app/store/app.reducer';

import * as fromClients from '../../../store/client/client.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  public clients: Client[] = [];

  constructor(private store: Store<AppState>,private router:Router) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectClientState),
        select(fromClients.selectAll)
      )
      .subscribe(data => {
        this.clients = data;
      });
  }

  public openClientOnClick(id: number) {
    this.router.navigateByUrl(`/private/client/${id}`);
  }
}
