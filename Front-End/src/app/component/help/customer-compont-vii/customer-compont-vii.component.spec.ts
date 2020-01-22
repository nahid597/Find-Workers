import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompontVIIComponent } from './customer-compont-vii.component';

describe('CustomerCompontVIIComponent', () => {
  let component: CustomerCompontVIIComponent;
  let fixture: ComponentFixture<CustomerCompontVIIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCompontVIIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompontVIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
