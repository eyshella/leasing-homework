import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Bid } from 'src/app/models/bid';
import { Client } from 'src/app/models/client';
import { AppState, selectBidState, selectClientState } from 'src/app/store/app.reducer';

import * as fromBids from '../../../store/bid/bid.reducer';
import * as fromClients from '../../../store/client/client.reducer';
import { Dictionary } from '@ngrx/entity';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-bids-list',
  templateUrl: './bids-list.component.html',
  styleUrls: ['./bids-list.component.scss']
})
export class BidsListComponent implements OnInit {

  public bids: Bid[] = [];
  public clients: Dictionary<Client>;

  @Input()
  public set sort(v: boolean) {
    this._sort = v;
    this.processSort();
  }

  private _sort: boolean = false

  constructor(private store: Store<AppState>, private router: Router) {
    moment.locale('ru');
   }

  ngOnInit() {
    this.store
      .pipe(
        select(selectBidState),
        select(fromBids.selectAll)
      )
      .subscribe(data => {
        this.bids = data;
        this.processSort();
      });

    this.store
      .pipe(
        select(selectClientState),
        select(fromClients.selectEntities)
      )
      .subscribe(data => {
        this.clients = data;
        this.processSort();
      });
  }

  public openBidOnClick(id: number) {
    this.router.navigateByUrl(`/private/bids/${id}`);
  }


  private processSort() {
    if (this.bids.length == 0) {
      return;
    }


    this.bids = this.bids.sort((a, b) => {
      if (moment(a.date,'DD.MM.YYYY').isAfter(moment(b.date,'DD.MM.YYYY'))) {
        return this._sort ? 1 : -1;
      }
      if (moment(a.date,'DD.MM.YYYY').isSame(moment(b.date,'DD.MM.YYYY'))) {
        return 0;
      }
      return this._sort ? -1 : 1;
    })
  }

}
