import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberUpdateComponent } from './phone-number-update.component';

describe('PhoneNumberUpdateComponent', () => {
  let component: PhoneNumberUpdateComponent;
  let fixture: ComponentFixture<PhoneNumberUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneNumberUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumberUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
