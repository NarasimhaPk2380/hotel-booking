import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../shared/models/hotel.model';

@Component({
  selector: 'bookings-my-bookings-layout',
  templateUrl: './my-bookings-layout.component.html',
  styleUrls: ['./my-bookings-layout.component.scss'],
})
export class MyBookingsLayoutComponent {
  bookingJson!: Hotel;
  constructor() {
    this.bookingJson = JSON.parse(localStorage.getItem('hotelJson') || '{}');
  }
}
