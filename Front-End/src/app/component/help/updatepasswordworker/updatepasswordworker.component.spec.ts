import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepasswordworkerComponent } from './updatepasswordworker.component';

describe('UpdatepasswordworkerComponent', () => {
  let component: UpdatepasswordworkerComponent;
  let fixture: ComponentFixture<UpdatepasswordworkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepasswordworkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepasswordworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
