import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComponentVIComponent } from './customer-component-vi.component';

describe('CustomerComponentVIComponent', () => {
  let component: CustomerComponentVIComponent;
  let fixture: ComponentFixture<CustomerComponentVIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerComponentVIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerComponentVIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
