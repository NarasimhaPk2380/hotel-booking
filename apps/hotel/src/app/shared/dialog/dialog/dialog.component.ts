import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel.model';
import { allowNumbersOnly } from '../../utils/common-functions';

@Component({
  selector: 'bookings-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @ViewChild('modal')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modal!: ElementRef<any>;
  @Input() isGuest = 'true';
  hotelJson!: Hotel;
  @Output() recieveDialogData = new EventEmitter();
  addGuestForm: FormGroup = new FormGroup({});
  confirmValue = false;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit() {
    this.addGuestForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
    });
  }

  openDialog(data = {}) {
    this.modal.nativeElement.style.display = 'block';
    const firstName = this.modal.nativeElement.querySelector('#firstname');
    const confirmCheckbox = this.modal.nativeElement.querySelector('#confirm');
    firstName?.focus();
    confirmCheckbox?.focus();
    this.trapFocus(this.modal.nativeElement);
    this.hotelJson = { ...data } as Hotel;
  }
  closeDialog() {
    this.modal.nativeElement.style.display = 'none';
    this.addGuestForm.setValue({
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      age: '',
    });
    this.addGuestForm.markAsUntouched();
  }

  submitGuestData() {
    this.recieveDialogData.emit(this.addGuestForm.value);
    this.closeDialog();
  }

  onlyNumbers(e: KeyboardEvent) {
    allowNumbersOnly(e);
  }
  goToMyBookings() {
    localStorage.setItem('hotelJson', JSON.stringify(this.hotelJson));
    this.router.navigate(['/my-bookings']);
    const mybookings: HTMLElement = <HTMLElement>(
      document?.body?.querySelector('#my-bookings')
    );
    mybookings.focus();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trapFocus(element: any) {
    const focusableEls = element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    element.addEventListener('keydown', (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
      if (e.key === 'Escape') {
        this.submitGuestData();
      }
      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }
}
