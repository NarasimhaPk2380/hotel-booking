import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, FormsModule],
  exports: [DialogComponent],
})
export class DialogModule {}
