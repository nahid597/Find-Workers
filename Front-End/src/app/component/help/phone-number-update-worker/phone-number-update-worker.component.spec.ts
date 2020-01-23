import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberUpdateWorkerComponent } from './phone-number-update-worker.component';

describe('PhoneNumberUpdateWorkerComponent', () => {
  let component: PhoneNumberUpdateWorkerComponent;
  let fixture: ComponentFixture<PhoneNumberUpdateWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumberUpdateWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberUpdateWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
