import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs/operators';
import { Bid } from 'src/app/models/bid';
import { Client } from 'src/app/models/client';
import { AppState, selectBidState, selectClientState, selectAgreementState } from 'src/app/store/app.reducer';

import * as fromBids from '../../../store/bid/bid.reducer';
import * as fromClients from '../../../store/client/client.reducer';
import * as bidActions from '../../../store/bid/bid.actions';
import { BidCalculation } from 'src/app/models/bid-calculation';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AgreementBuilder } from 'src/app/helpers/agreement-builder/agreement.builder';
import * as AgreementActions from '../../../store/agreement/agreement.actions';
import * as fromAgreement from '../../../store/agreement/agreement.reducer';

import * as moment from 'moment';

@Component({
  selector: 'app-bid-calculation',
  templateUrl: './bid-calculation.component.html',
  styleUrls: ['./bid-calculation.component.scss']
})
export class BidCalculationComponent implements OnInit {

  public bid: Bid;
  public client: Client;

  public calculation: BidCalculation
  public nextAgreementId: number = 0;

  public calculationForm: FormGroup = new FormGroup({
    termOfUseInMonths: new FormControl(0),
    rate: new FormControl(0),
    estimatedCost: new FormControl(0)
  });

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
      .subscribe(data => {
        this.client = data;
        this.initCalculation();
        this.calculate();
      });

    this.store
      .pipe(
        select(selectAgreementState),
        select(fromAgreement.selectIds)
      )
      .subscribe(data => {
        this.nextAgreementId = data.length + 1;
      });

    this.calculationForm.valueChanges.subscribe(data => {

      if (
        data.estimatedCost != null &&
        data.estimatedCost > 0 &&
        data.rate != null &&
        data.rate > 0 &&
        data.termOfUseInMonths != null &&
        data.termOfUseInMonths > 0
      ) {
        this.calculation.estimatedCost = data.estimatedCost * 100;
        this.calculation.rate = data.rate / 100;
        this.calculation.termOfUseInMonths = data.termOfUseInMonths;
        this.calculate();
      }
    })
  }

  public rejectOnClick() {
    this.store.dispatch(bidActions.deleteBid({ id: this.id.toString() }));
    this.router.navigateByUrl('private/bids')
  }

  private initCalculation() {
    this.calculationForm.setValue({
      estimatedCost: this.bid.termInMonths * 1000,
      rate: 10,
      termOfUseInMonths: 120
    });

    this.calculation = {
      totalCost: this.bid.totalCost,
      termInMonths: this.bid.termInMonths,
      firstPaymentCost: this.bid.firstPaymentCost,
      rate: 0.10,
      VAT: 0,
      commission: 0,
      creditCost: 0,
      depreciation: 0,
      depreciationRate: 0,
      estimatedCost: this.bid.termInMonths * 100000,
      feeForFunds: 0,
      monthlyLeasePayment: 0,
      profitability: 0,
      termOfUseInMonths: 120,
      totalLeasePayment: 0,
    }
  }

  private calculate() {
    const termInYears = (this.calculation.termInMonths / 12);
    this.calculation.creditCost = this.calculation.totalCost - this.calculation.firstPaymentCost;
    this.calculation.depreciationRate = 1 / (this.calculation.termOfUseInMonths / 12);
    this.calculation.depreciation = Math.min(this.calculation.totalCost * this.calculation.depreciationRate * termInYears, this.calculation.totalCost);
    this.calculation.feeForFunds = this.calculation.rate * this.calculation.creditCost * termInYears;
    this.calculation.commission = this.calculation.creditCost * environment.commisionRate * termInYears;
    this.calculation.VAT = (this.calculation.feeForFunds + this.calculation.commission) * 0.2;
    this.calculation.totalLeasePayment = (this.calculation.depreciation + this.calculation.feeForFunds + this.calculation.commission + this.calculation.VAT);
    this.calculation.monthlyLeasePayment = this.calculation.totalLeasePayment / this.calculation.termInMonths;
    this.calculation.profitability = this.calculation.commission / this.calculation.estimatedCost;
  }

  private createAgreement() {
    const agreementText = AgreementBuilder.buildAgreement(
      this.client.name,
      'Петрова Сергея Васильевича',
      moment().format('L'),
      moment().add(1, 'months').format('L'),
      this.calculation.termInMonths.toString(),
      (this.calculation.monthlyLeasePayment / 100).toFixed(2),
      (this.calculation.VAT / this.calculation.termInMonths / 100).toFixed(2),
      (this.calculation.totalLeasePayment / 100).toFixed(2),
      (this.calculation.VAT / 100).toFixed(2),
      ((this.calculation.totalCost - this.calculation.depreciation) / 100).toFixed(2),
      ((this.calculation.totalCost - this.calculation.depreciation) * 0.2 / 100).toFixed(2)
    );

    this.store.dispatch(AgreementActions.addAgreement({
      agreement: {
        content: agreementText,
        bidId: this.bid.id,
        clientId: this.bid.clientId,
        id: this.nextAgreementId
      }
    }));

    this.router.navigateByUrl('private/agreements')
  }
}
