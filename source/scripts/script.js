'Use strict';

const MAX_GUESTS_PER_ROOM = 3;

const formElement = document.forms['search-form'];

const guests = formElement['guests'];
const rooms = formElement['rooms'];
const dateIn = formElement['date-in'];
const dateOut = formElement['date-out'];
const buttonSearch = formElement['search-button'];

guests.min = 1;
guests.max = 6;
guests.required = true;

const setRoomsNumber = (rooms, guests) => {
  rooms.min = Math.ceil(guests / MAX_GUESTS_PER_ROOM);
  rooms.max = guests;
}

guests.value = 2;

setRoomsNumber(rooms, guests.value);

rooms.value = rooms.min;

