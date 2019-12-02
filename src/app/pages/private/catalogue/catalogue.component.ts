import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  agreementsSortAsc: boolean = false;
  bidsSortAsc: boolean = false;
  clientsSortAsc: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
