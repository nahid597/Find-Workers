import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercomponentIVComponent } from './customercomponent-iv.component';

describe('CustomercomponentIVComponent', () => {
  let component: CustomercomponentIVComponent;
  let fixture: ComponentFixture<CustomercomponentIVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercomponentIVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercomponentIVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
