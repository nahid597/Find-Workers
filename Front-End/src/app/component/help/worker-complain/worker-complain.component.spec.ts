import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerComplainComponent } from './worker-complain.component';

describe('WorkerComplainComponent', () => {
  let component: WorkerComplainComponent;
  let fixture: ComponentFixture<WorkerComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
