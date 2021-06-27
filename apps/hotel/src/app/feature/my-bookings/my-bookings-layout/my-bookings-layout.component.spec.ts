import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingsLayoutComponent } from './my-bookings-layout.component';

describe('MyBookingsLayoutComponent', () => {
  let component: MyBookingsLayoutComponent;
  let fixture: ComponentFixture<MyBookingsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
