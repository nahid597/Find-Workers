import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateNumberComponent } from './validate-number.component';

describe('ValidateNumberComponent', () => {
  let component: ValidateNumberComponent;
  let fixture: ComponentFixture<ValidateNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
