import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookingLayoutComponent } from './room-booking-layout.component';

describe('RoomBookingLayoutComponent', () => {
  let component: RoomBookingLayoutComponent;
  let fixture: ComponentFixture<RoomBookingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomBookingLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomBookingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
