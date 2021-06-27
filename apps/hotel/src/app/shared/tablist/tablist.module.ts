import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablistDirective } from './tablist.directive';

@NgModule({
  declarations: [TablistDirective],
  imports: [CommonModule],
  exports: [TablistDirective],
})
export class TablistModule {}
