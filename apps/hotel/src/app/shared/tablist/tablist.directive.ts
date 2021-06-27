import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

// function changeTabs(e) {
//   const target = e.target;
//   const parent = target.parentNode;
//   const grandparent = parent.parentNode;

//   // Remove all current selected tabs
//   parent
//     .querySelectorAll('[aria-selected="true"]')
//     .forEach((t) => t.setAttribute('aria-selected', false));

//   // Set this tab as selected
//   target.setAttribute('aria-selected', true);

//   // Hide all tab panels
//   grandparent
//     .querySelectorAll('[role="tabpanel"]')
//     .forEach((p) => p.setAttribute('hidden', true));

//   // Show the selected panel
//   grandparent.parentNode
//     .querySelector(`#${target.getAttribute('aria-controls')}`)
//     .removeAttribute('hidden');
// }

@Directive({
  selector: '[bookingsTablist]',
})
export class TablistDirective implements AfterViewInit {
  constructor(private rd2: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const tabs = this.el.nativeElement.querySelectorAll('[role="tab"]');
    const tabList = this.el.nativeElement.querySelector('[role="tablist"]');
    console.log(tabList);
    
  }
}
