import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProceedComponent } from './order-proceed.component';

describe('OrderProceedComponent', () => {
  let component: OrderProceedComponent;
  let fixture: ComponentFixture<OrderProceedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProceedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProceedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
