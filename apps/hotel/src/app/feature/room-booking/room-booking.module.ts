import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RoomBookingLayoutComponent } from './room-booking-layout/room-booking-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { TablistModule } from '../../shared/tablist/tablist.module';
import { TabTriggerComponent } from './tab-trigger/tab-trigger.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';

const routes: Routes = [
  {
    path: '',
    component: RoomBookingLayoutComponent,
  },
];

@NgModule({
  declarations: [RoomBookingLayoutComponent, TabTriggerComponent, TabPanelComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    DialogModule,
    TablistModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class RoomBookingModule {}
