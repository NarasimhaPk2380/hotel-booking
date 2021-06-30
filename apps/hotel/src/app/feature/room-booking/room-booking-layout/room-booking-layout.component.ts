import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogComponent } from '../../../shared/dialog/dialog/dialog.component';
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
  @ViewChild('dialog')
  dialog!: DialogComponent;
  @ViewChildren(TabTriggerComponent, { read: ElementRef })
  tabElements!: QueryList<ElementRef>;
  tabs!: ElementRef[];
  activated = 0;
  focused = 0;
  foodServices: string[] = ['breakfast', 'lunch', 'dinner'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.roomBookingForm = this.fb.group(
      {
        checkin: new FormControl('', [Validators.required]),
        checkout: new FormControl('', [Validators.required]),
        roomType: new FormControl('', [Validators.required]),
        numOfPersons: new FormControl('', [Validators.required]),
        foodService: new FormGroup({}, [this.foodServiceValidator()]),
        pickup: new FormControl('', [Validators.required]),
      },
      {
        validator: this.datesCompareValidator('checkin', 'checkout'),
      }
    );
    this.foodServices.forEach((item) => {
      const customFormGroup: FormGroup = <FormGroup>(
        this.roomBookingForm.controls['foodService']
      );
      customFormGroup.addControl(item, new FormControl(false));
    });
    this.paymentForm = this.fb.group({
      paymentType: new FormControl('cc', [Validators.required]),
      cardholdername: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp('^(0[1-9]|1[0-2])/?([0-9]{2})$')),
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
      upiNumber: new FormControl('', []),
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
  // check atleast one food service is checked
  foodServiceValidator() {
    return () => {
      if (!this.foodServicesSelection) {
        return { foodServices: true };
      } else {
        return null;
      }
    };
  }

  get foodServicesSelection(): boolean {
    const boolList =
      Object?.values(
        this.roomBookingForm.controls['foodService']?.value || {}
      ) || [];
    return boolList.indexOf(true) != -1;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPaymentChange(e: any) {
    const controls: Array<string | Validators[]> = [
      ['cardholdername', [Validators.required]],
      [
        'cardNumber',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      [
        'expirationDate',
        [
          Validators.required,
          Validators.pattern(new RegExp('^(0[1-9]|1[0-2])/?([0-9]{2})$')),
        ],
      ],
      [
        'cvv',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
    ];
    if (e.target.value === 'upi') {
      for (let i = 0; i < controls.length; i++) {
        this.paymentForm.get(controls[i][0] as string)?.clearValidators();
        // this.paymentForm.get(controls[i])?.setValue('');
        this.paymentForm
          .get(controls[i][0] as string)
          ?.updateValueAndValidity();
      }
      this.paymentForm
        .get('upiNumber')
        ?.setValidators([Validators.required, Validators.email]);
      // this.paymentForm.get('upiNumber')?.setValue('');
      this.paymentForm.get('upiNumber')?.updateValueAndValidity();
    } else {
      for (let i = 0; i < controls.length; i++) {
        this.paymentForm
          .get(controls[i][0] as string)
          ?.setValidators([...(controls[i][1] as [])]);
        // this.paymentForm.get(controls[i])?.setValue('');
        this.paymentForm
          .get(controls[i][0] as string)
          ?.updateValueAndValidity();
      }
      this.paymentForm.get('upiNumber')?.clearValidators();
      // this.paymentForm.get('upiNumber')?.setValue('');
      this.paymentForm.get('upiNumber')?.updateValueAndValidity();
    }
  }
  paymentProceed() {
    this.dialog.openDialog({ ...this.bookingJson, ...this.paymentForm.value });
  }
  recieveDialogData(e: Guest) {
    this.bookingJson.guests.push({ ...e });
    this.focusPanel(1);
  }
  onlyNumbers(e: KeyboardEvent) {
    allowNumbersOnly(e);
  }
}
