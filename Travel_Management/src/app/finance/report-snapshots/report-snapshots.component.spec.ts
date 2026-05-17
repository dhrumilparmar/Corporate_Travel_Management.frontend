import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSnapshotsComponent } from './report-snapshots.component';

describe('ReportSnapshotsComponent', () => {
  let component: ReportSnapshotsComponent;
  let fixture: ComponentFixture<ReportSnapshotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSnapshotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSnapshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
