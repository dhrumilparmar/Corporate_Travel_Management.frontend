import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFinanceComponent } from './profile-finance.component';

describe('ProfileFinanceComponent', () => {
  let component: ProfileFinanceComponent;
  let fixture: ComponentFixture<ProfileFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
