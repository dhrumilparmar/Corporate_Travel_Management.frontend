import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestHistoryFinanceComponent } from './request-history-finance.component';

describe('RequestHistoryFinanceComponent', () => {
  let component: RequestHistoryFinanceComponent;
  let fixture: ComponentFixture<RequestHistoryFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestHistoryFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestHistoryFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
