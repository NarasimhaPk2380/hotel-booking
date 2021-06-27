import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyBookingsLayoutComponent } from './my-bookings-layout/my-bookings-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MyBookingsLayoutComponent,
  },
];

@NgModule({
  declarations: [MyBookingsLayoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MyBookingsModule {}
