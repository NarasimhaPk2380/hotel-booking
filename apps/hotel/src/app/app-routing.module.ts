import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'room-booking',
    loadChildren: () =>
      import('./feature/room-booking/room-booking.module').then(
        (m) => m.RoomBookingModule
      ),
  },
  {
    path: 'my-bookings',
    loadChildren: () =>
      import('./feature/my-bookings/my-bookings.module').then(
        (m) => m.MyBookingsModule
      ),
  },
  {
    path: '',
    redirectTo: '/room-booking',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/room-booking',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
