import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercomponentIIIComponent } from './customercomponent-iii.component';

describe('CustomercomponentIIIComponent', () => {
  let component: CustomercomponentIIIComponent;
  let fixture: ComponentFixture<CustomercomponentIIIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercomponentIIIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercomponentIIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
