import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSubmitionComponent } from './bill-submition.component';

describe('BillSubmitionComponent', () => {
  let component: BillSubmitionComponent;
  let fixture: ComponentFixture<BillSubmitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillSubmitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillSubmitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
