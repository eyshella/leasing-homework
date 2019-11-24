import { Component, OnInit } from '@angular/core';
import { Agreement } from 'src/app/models/agreement';

@Component({
  selector: 'app-agreements-list',
  templateUrl: './agreements-list.component.html',
  styleUrls: ['./agreements-list.component.scss']
})
export class AgreementsListComponent implements OnInit {

  public agreements: Agreement[] = [];
  constructor() { }

  ngOnInit() {
  }

  public openAgreementOnClick() {
    
  }
}
