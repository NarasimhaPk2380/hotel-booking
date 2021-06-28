import { Component, Input } from '@angular/core';

@Component({
  selector: 'bookings-tab-trigger',
  templateUrl: './tab-trigger.component.html',
  styleUrls: ['./tab-trigger.component.scss'],
})
export class TabTriggerComponent {
  @Input()
  isActive!: boolean;
  @Input()
  triggerId!: string;
  @Input()
  panelId!: string;
  @Input()
  isPanelDisabled = false;
}
