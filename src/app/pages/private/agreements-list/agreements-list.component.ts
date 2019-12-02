import { Component, OnInit, Input } from '@angular/core';
import { Agreement } from 'src/app/models/agreement';
import * as fromClients from '../../../store/client/client.reducer';
import * as fromAgreement from '../../../store/agreement/agreement.reducer';
import { select, Store } from '@ngrx/store';
import { selectAgreementState, selectClientState, AppState } from 'src/app/store/app.reducer';
import { Dictionary } from '@ngrx/entity';
import { Client } from 'src/app/models/client';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';


@Component({
  selector: 'app-agreements-list',
  templateUrl: './agreements-list.component.html',
  styleUrls: ['./agreements-list.component.scss']
})
export class AgreementsListComponent implements OnInit {

  public agreements: Agreement[] = [];
  public clients: Dictionary<Client>;

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
        select(selectAgreementState),
        select(fromAgreement.selectAll)
      )
      .subscribe(data => {
        this.agreements = data;
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

  public saveAgreementOnClick(agreement: Agreement) {
    saveAs(new Blob([agreement.content]), `Договор-${this.clients[agreement.clientId].name}-${agreement.id}.doc`)
  }

  private processSort() {
    if (this.clients == null || Object.keys(this.clients).length === 0) {
      return;
    }

    if (this.agreements.length === 0) {
      return
    }

    this.agreements = this.agreements.sort((a, b) => {
      if (this.clients[a.id].name < this.clients[b.id].name) {
        return this._sort ? 1 : -1;
      }
      if (this.clients[a.id].name === this.clients[b.id].name) {
        return 0;
      }
      if (this.clients[a.id].name > this.clients[b.id].name) {
        return this._sort ? -1 : 1;
      }
      return 0;
    })
  }
}
