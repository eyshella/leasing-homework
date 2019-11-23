import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Bid } from 'src/app/models/bid';
import { Client } from 'src/app/models/client';
import { AppState, selectBidState, selectClientState } from 'src/app/store/app.reducer';

import * as fromBids from '../../../store/bid/bid.reducer';
import * as fromClients from '../../../store/client/client.reducer';
import { Dictionary } from '@ngrx/entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bids-list',
  templateUrl: './bids-list.component.html',
  styleUrls: ['./bids-list.component.scss']
})
export class BidsListComponent implements OnInit {

  public bids: Bid[] = [];
  public clients: Dictionary<Client>;

  constructor(private store: Store<AppState>, private router:Router) { }

  ngOnInit() {
    this.store
      .pipe(
        select(selectBidState),
        select(fromBids.selectAll)
      )
      .subscribe(data => {
        this.bids = data;
      });

    this.store
      .pipe(
        select(selectClientState),
        select(fromClients.selectEntities)
      )
      .subscribe(data => {
        this.clients = data;
      });
  }

  public openBidOnClick(id: number) {
    this.router.navigateByUrl(`/private/bids/${id}`);
  }

}
