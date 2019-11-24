import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store/app.reducer';
import * as AuthActions from './store/auth/auth.actions';
import * as ClientActions from './store/client/client.actions';
import * as BidActions from './store/bid/bid.actions';
import * as AgreementActions from './store/agreement/agreement.actions';
import { AgreementBuilder } from './helpers/agreement-builder/agreement.builder';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    moment.locale('ru');
   }

  public ngOnInit() {
    this.store.dispatch(AuthActions.loadAuth());

    // Test data
    this.store.dispatch(ClientActions.addClients({
      clients: [
        { id: 1, name: `ООО "СК Фундамент"` },
        { id: 2, name: `ООО "Петербургская область"` },
        { id: 3, name: `ООО "Фокс Девелопмент"` },
        { id: 4, name: `ОАО "Ланит-Терком"` }
      ]
    }));

    this.store.dispatch(BidActions.addBids({
      bids: [
        { id: 1, termInMonths: 48, clientId: 1, firstPaymentCost: 70000000, totalCost: 700000000, product: 'BMW X7' },
        { id: 2, termInMonths: 24, clientId: 2, firstPaymentCost: 7000000, totalCost: 50000000, product: 'Lada Largus' },
        { id: 3, termInMonths: 6, clientId: 2, firstPaymentCost: 1000000, totalCost: 6000000, product: 'Сварочный инвертер' },
        { id: 4, termInMonths: 6, clientId: 2, firstPaymentCost: 1000000, totalCost: 3000000, product: 'Пила торцовочная Metabo' },
        { id: 5, termInMonths: 12, clientId: 3, firstPaymentCost: 1000000, totalCost: 25510000, product: 'Сервер Asus RS100-E9-PI2' },
        { id: 6, termInMonths: 12, clientId: 3, firstPaymentCost: 200000, totalCost: 7462000, product: 'Сервер SuperMicro SYS-5018R-WR' },
        { id: 7, termInMonths: 4, clientId: 4, firstPaymentCost: 1000000, totalCost: 328700000, product: 'Mitsubishi Pajero Sport' },
      ]
    }));

    const agreement1 = AgreementBuilder.buildAgreement(
      `ООО "СК Фундамент"`,
      'Петрова Сергея Васильевича',
      moment().format('L'),
      moment().add(1, 'months').format('L'),
      '48',
      '450000',
      '90000',
      '21600000',
      '4410000',
      '10000000',
      '2000000'
    );

    const agreement2 = AgreementBuilder.buildAgreement(
      `ООО "СК Фундамент"`,
      'Петрова Сергея Васильевича',
      moment().format('L'),
      moment().add(1, 'months').format('L'),
      '48',
      '450000',
      '90000',
      '21600000',
      '4410000',
      '10000000',
      '2000000'
    );

    this.store.dispatch(AgreementActions.addAgreements({
      agreements: [
        { id: 1, bidId: null, clientId: 1, content: agreement1 },
        { id: 2, bidId: null, clientId: 1, content: agreement2 },
      ]
    }));
  }
}
