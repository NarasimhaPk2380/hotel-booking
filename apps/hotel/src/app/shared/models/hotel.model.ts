export interface Hotel {
  checkin: string;
  checkout: string;
  roomType: string;
  numOfPersons: string;
  foodService: string;
  pickup: string;
  guests: Array<Guest>;
}

export interface Guest {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  age: string;
}
