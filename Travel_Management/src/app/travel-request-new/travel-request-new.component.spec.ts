import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelRequestNewComponent } from './travel-request-new.component';

describe('TravelRequestNewComponent', () => {
  let component: TravelRequestNewComponent;
  let fixture: ComponentFixture<TravelRequestNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelRequestNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelRequestNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
