import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomercomponetIIComponent } from './customercomponet-ii.component';

describe('CustomercomponetIIComponent', () => {
  let component: CustomercomponetIIComponent;
  let fixture: ComponentFixture<CustomercomponetIIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomercomponetIIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomercomponetIIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
