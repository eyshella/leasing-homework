import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { Bid } from 'src/app/models/bid';
import { Client } from 'src/app/models/client';
import { AppState, selectBidState, selectClientState } from 'src/app/store/app.reducer';

import * as fromBids from '../../../store/bid/bid.reducer';
import * as fromClients from '../../../store/client/client.reducer';

@Component({
  selector: 'app-bid-item',
  templateUrl: './bid-item.component.html',
  styleUrls: ['./bid-item.component.scss']
})
export class BidItemComponent implements OnInit {
  public bid: Bid;
  public client: Client;

  private id = 0;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");

    this.store
      .pipe(
        select(selectBidState),
        select(fromBids.selectBid, { id: this.id }),
        tap(data => this.bid = data),
        switchMap(data => this.store
          .pipe(
            select(selectClientState),
            select(fromClients.selectClient, { id: data.clientId })
          )
        )
      )
      .subscribe(data => this.client = data);
  }

  public calculateOnClick(){
    this.router.navigateByUrl(`private/bids/${this.id}/calculation`)
  }
}
