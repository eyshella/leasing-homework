import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

import { AgreementBuilder } from './helpers/agreement-builder/agreement.builder';
import * as AgreementActions from './store/agreement/agreement.actions';
import { AppState } from './store/app.reducer';
import * as AuthActions from './store/auth/auth.actions';
import * as BidActions from './store/bid/bid.actions';
import * as ClientActions from './store/client/client.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isMenuButtonHided: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {
    moment.locale('ru');
  }

  public ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!event.url.startsWith('/private') || event.url.startsWith('/private/menu')) {
          this.isMenuButtonHided = true
        } else {
          this.isMenuButtonHided = false;
        }
      }
    })
    this.store.dispatch(AuthActions.loadAuth());

    // Test data
    this.store.dispatch(ClientActions.addClients({
      clients: [
        { id: 1, name: `ООО "СК Арматура"`, address: '249132, г. Устье, ул. Ладожская, дом 58, квартира 126', bank: 'ФК Открытие', bik: '024365823', inn: '7840553155', kpp: '744002201', ogrn: '1129848888880', okpo: '55555555', nameOfRepresentative: 'Конягина Эмилия Платоновна', paymentAccount: '40817810099999999999', correspondentAccount: '30101810200000000593' },
        { id: 2, name: `ООО "Ленинградская область"`, address: '624851, г. Североморск, ул. Очаковская, дом 70, квартира 126', bank: 'ФК Открытие', bik: '024365823', inn: '7840553155', kpp: '744002201', ogrn: '1129848888880', okpo: '55555555', nameOfRepresentative: 'Никитина Антонина Виталиевна', paymentAccount: '40817810099999999999', correspondentAccount: '3010181020000000059' },
        { id: 3, name: `ООО "Фокс Девелопмент"`, address: '368256, г. Оршанка, ул. Калужская М., дом 36, квартира 5', bank: 'ФК Открытие', bik: '024365823', inn: '7840553155', kpp: '744002201', ogrn: '1129848888880', okpo: '55555555', nameOfRepresentative: 'Константинова Любомила Борисовна', paymentAccount: '40817810099999999999', correspondentAccount: '30101810200000000593' },
        { id: 4, name: `ОАО "Ланит-Терком"`, address: '390527, г. Урень, ул. Дубровский Проезд, дом 2, квартира 158', bank: 'ФК Открытие', bik: '024365823', inn: '7840553155', kpp: '744002201', ogrn: '1129848888880', okpo: '55555555', nameOfRepresentative: 'Русов Давид Максимович', paymentAccount: '40817810099999999999', correspondentAccount: '30101810200000000593' }
      ]
    }));

    this.store.dispatch(BidActions.addBids({
      bids: [
        { id: 1, termInMonths: 48, clientId: 1, firstPaymentCost: 70000000, totalCost: 700000000, product: 'BMW X7', date: moment('10.10.19').format("L") },
        { id: 2, termInMonths: 24, clientId: 2, firstPaymentCost: 7000000, totalCost: 50000000, product: 'Lada Largus', date: moment('11.18.19').format("L") },
        { id: 3, termInMonths: 6, clientId: 2, firstPaymentCost: 1000000, totalCost: 6000000, product: 'Сварочный инвертер', date: moment('11.13.19').format("L") },
        { id: 4, termInMonths: 6, clientId: 2, firstPaymentCost: 1000000, totalCost: 3000000, product: 'Пила торцовочная Metabo', date: moment('12.1.19').format("L") },
        { id: 5, termInMonths: 12, clientId: 3, firstPaymentCost: 1000000, totalCost: 25510000, product: 'Сервер Asus RS100-E9-PI2', date: moment('11.28.19').format("L") },
        { id: 6, termInMonths: 12, clientId: 3, firstPaymentCost: 200000, totalCost: 7462000, product: 'Сервер SuperMicro SYS-5018R-WR', date: moment('11.29.19').format("L") },
        { id: 7, termInMonths: 4, clientId: 4, firstPaymentCost: 1000000, totalCost: 328700000, product: 'Mitsubishi Pajero Sport', date: moment().format("L") },
      ]
    }));

    /*    const agreement1 = AgreementBuilder.buildAgreement(
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
         '2000000',
         '1037811047955',
         '7805138942',
         '784201001',
         '52127939',
         '52127939',
         '40817810099910004312',
         'АО «Альфа-Банк»',
         'УЛИЦА МИРГОРОДСКАЯ, 1B',
         '30101810200000000593',
          'Автомобиль BMW X7'
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
         '2000000',
         '1037811047955',
         '7805138942',
         '784201001',
         '52127939',
         '52127939',
         '40817810099910004312',
         'АО «Альфа-Банк»',
         'УЛИЦА МИРГОРОДСКАЯ, 1B',
         '30101810200000000593',
         'Автомобиль BMW X7'
       );
 
       this.store.dispatch(AgreementActions.addAgreements({
         agreements: [
           { id: 1, bidId: 7, clientId: 4, content: agreement1, date: moment().format("L") },
           { id: 2, bidId: 7, clientId: 4, content: agreement2, date: moment().format("L") },
         ]
       })); */
  }

  private openMenu() {
    this.router.navigateByUrl('private/menu')
  }
}
