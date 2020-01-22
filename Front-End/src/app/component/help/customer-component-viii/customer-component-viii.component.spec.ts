import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponentVIIIComponent } from './customer-component-viii.component';

describe('CustomerComponentVIIIComponent', () => {
  let component: CustomerComponentVIIIComponent;
  let fixture: ComponentFixture<CustomerComponentVIIIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComponentVIIIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponentVIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
