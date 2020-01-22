import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeWorkerComponent } from './become-worker.component';

describe('BecomeWorkerComponent', () => {
  let component: BecomeWorkerComponent;
  let fixture: ComponentFixture<BecomeWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
