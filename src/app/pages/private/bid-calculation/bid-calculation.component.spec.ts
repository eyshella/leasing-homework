import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidCalculationComponent } from './bid-calculation.component';

describe('bidsCalculationComponent', () => {
  let component: BidCalculationComponent;
  let fixture: ComponentFixture<BidCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
