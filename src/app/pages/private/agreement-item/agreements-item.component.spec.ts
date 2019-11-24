import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsItemComponent } from './agreements-item.component';

describe('AgreementsItemComponent', () => {
  let component: AgreementsItemComponent;
  let fixture: ComponentFixture<AgreementsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
