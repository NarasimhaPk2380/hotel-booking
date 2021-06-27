import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bookings-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.scss'],
})
export class TabPanelComponent {
  @Input()
  panelId!: string;
  @Input()
  triggerId!: string;
}
