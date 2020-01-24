'Use strict';

const MAX_GUESTS_PER_ROOM = 2;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;
const GUESTS_DEFAULT = 2;

{
  const formElement = document.forms['search-form'];

  const guests = formElement['guests'];
  const rooms = formElement['rooms'];
  const dateIn = formElement['date-in'];
  const dateOut = formElement['date-out'];
  const buttonSearch = formElement['search-button'];

  guests.min = GUESTS_MIN;
  guests.max = GUESTS_MAX;
  guests.value = GUESTS_DEFAULT;

  const setRoomsNumber = (rooms, guests) => {
    rooms.min = Math.ceil(guests / MAX_GUESTS_PER_ROOM);
    rooms.max = guests;
    rooms.value = rooms.min;
  }

  setRoomsNumber(rooms, guests.value);

  guests.onchange = () => {
    setRoomsNumber(rooms, guests.value);
  }

  formElement.onsubmit = (event) => {
    event.preventDefault();

    const dateToExpire = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const formattedDate = new Date(dateToExpire).toUTCString();

    document.cookie = `guests=${guests.value};expires=${formattedDate}`;
    document.cookie = `rooms=${rooms.value};expires=${formattedDate}`;

    formElement.submit();
  }

}