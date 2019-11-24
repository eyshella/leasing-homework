import { Component, OnInit } from '@angular/core';
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

  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {

    this.store
      .pipe(
        select(selectAgreementState),
        select(fromAgreement.selectAll)
      )
      .subscribe(data => {
        this.agreements = data;
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

  public saveAgreementOnClick(agreement: Agreement) {
    saveAs(new Blob([agreement.content]), `Договор-${this.clients[agreement.clientId].name}-${agreement.id}.doc`)
  }
}
