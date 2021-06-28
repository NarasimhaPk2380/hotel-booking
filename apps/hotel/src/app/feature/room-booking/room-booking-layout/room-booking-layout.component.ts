import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Guest, Hotel } from '../../../shared/models/hotel.model';
import { allowNumbersOnly } from '../../../shared/utils/common-functions';
import { TabTriggerComponent } from '../tab-trigger/tab-trigger.component';

@Component({
  selector: 'bookings-room-booking-layout',
  templateUrl: './room-booking-layout.component.html',
  styleUrls: ['./room-booking-layout.component.scss'],
})
export class RoomBookingLayoutComponent implements OnInit, AfterViewInit {
  roomBookingForm: FormGroup = new FormGroup({});
  paymentForm: FormGroup = new FormGroup({});
  bookingJson: Hotel = {
    ...this.roomBookingForm.value,
    guests: [],
  };
  @ViewChildren(TabTriggerComponent, { read: ElementRef })
  tabElements!: QueryList<ElementRef>;
  tabs!: ElementRef[];
  activated = 0;
  focused = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.roomBookingForm = this.fb.group(
      {
        checkin: new FormControl('', [Validators.required]),
        checkout: new FormControl('', [Validators.required]),
        roomType: new FormControl('', [Validators.required]),
        numOfPersons: new FormControl('', [Validators.required]),
        foodService: new FormControl([], [Validators.required]),
        pickup: new FormControl('', [Validators.required]),
      },
      {
        validator: this.datesCompareValidator('checkin', 'checkout'),
      }
    );
    this.paymentForm = this.fb.group({
      paymentType: new FormControl('', [Validators.required]),
      cardholdername: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    });
  }

  // CheckIn and checkout validation
  datesCompareValidator(checkIndt: string, checkoutdt: string) {
    return (formGroup: FormGroup) => {
      const checkIn = formGroup.controls[checkIndt].value;
      const checkOut = formGroup.controls[checkoutdt].value;
      if (new Date(checkIn) >= new Date(checkOut)) {
        return { datesInvalid: true };
      } else {
        return null;
      }
    };
  }

  ngAfterViewInit(): void {
    this.tabs = this.tabElements.toArray();
    this.tabElements.first.nativeElement.firstChild.tabIndex = '0';
  }

  activatePanel(index: number) {
    this.tabs.forEach((tab) => (tab.nativeElement.firstChild.tabIndex = -1));
    this.tabs[index].nativeElement.firstChild.tabIndex = '0';
    this.focused = index;
    this.activated = index;
    this.tabs[index].nativeElement.firstChild.focus();
  }

  focusPanel(index: number) {
    this.focused = index;
    this.tabs[this.focused].nativeElement.firstChild.focus();
  }

  handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.focusPanel(this.focused ? this.focused - 1 : this.tabs.length - 1);
        break;
      case 'ArrowRight':
        this.focusPanel((this.focused + 1) % this.tabs.length);
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange(event: any): void {
    const bookingList = this.roomBookingForm.get('foodService')?.value;
    if (event?.target.checked) {
      this.roomBookingForm
        ?.get('foodService')
        ?.setValue([...bookingList, event.target?.value]);
    } else {
      const index = bookingList.indexOf(event.target?.value);
      bookingList.splice(index, 1);
      this.roomBookingForm?.get('foodService')?.setValue([...bookingList]);
    }
  }

  onNextClick(tabName: string): void {
    switch (tabName) {
      case 'stay':
        this.bookingJson = {
          ...this.bookingJson,
          ...this.roomBookingForm.value,
        };
        this.activatePanel(1);
        break;
      case 'guest':
    }
  }
  recieveDialogData(e: Guest) {
    this.bookingJson.guests.push({ ...e });
    this.focusPanel(1);
  }
  onlyNumbers(e: KeyboardEvent) {
    allowNumbersOnly(e);
  }
}
