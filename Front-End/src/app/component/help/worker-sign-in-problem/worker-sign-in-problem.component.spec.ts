import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSignInProblemComponent } from './worker-sign-in-problem.component';

describe('WorkerSignInProblemComponent', () => {
  let component: WorkerSignInProblemComponent;
  let fixture: ComponentFixture<WorkerSignInProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerSignInProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerSignInProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
