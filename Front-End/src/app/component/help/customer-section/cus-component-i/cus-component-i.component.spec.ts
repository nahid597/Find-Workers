import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusComponentIComponent } from './cus-component-i.component';

describe('CusComponentIComponent', () => {
  let component: CusComponentIComponent;
  let fixture: ComponentFixture<CusComponentIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusComponentIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusComponentIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
