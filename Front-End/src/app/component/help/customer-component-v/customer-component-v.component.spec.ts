import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponentVComponent } from './customer-component-v.component';

describe('CustomerComponentVComponent', () => {
  let component: CustomerComponentVComponent;
  let fixture: ComponentFixture<CustomerComponentVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComponentVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponentVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
