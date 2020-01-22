import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerPhoneUpdateComponent } from './worker-phone-update.component';

describe('WorkerPhoneUpdateComponent', () => {
  let component: WorkerPhoneUpdateComponent;
  let fixture: ComponentFixture<WorkerPhoneUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerPhoneUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerPhoneUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
