import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSectionComponent } from './worker-section.component';

describe('WorkerSectionComponent', () => {
  let component: WorkerSectionComponent;
  let fixture: ComponentFixture<WorkerSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
