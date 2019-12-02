import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Client } from 'src/app/models/client';
import { AppState, selectClientState } from 'src/app/store/app.reducer';

import * as fromClients from '../../../store/client/client.reducer';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss']
})
export class ClientItemComponent implements OnInit {
  public client: Client;

  private id = 0;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");

    this.store
      .pipe(
        select(selectClientState),
        select(fromClients.selectClient, { id: this.id }),
      )
      .subscribe(data => this.client = data);
  }
}
