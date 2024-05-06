import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepLogsListGuestComponent } from './sleep-logs-list-guest.component';

describe('SleepLogsListGuestComponent', () => {
  let component: SleepLogsListGuestComponent;
  let fixture: ComponentFixture<SleepLogsListGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepLogsListGuestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SleepLogsListGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
