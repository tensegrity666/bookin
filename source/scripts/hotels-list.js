'Use strict';

const container = document.querySelector('.hotels-list');

const getElementFromTemplate = function (data) {
  const template = document.querySelector('#hotelTemplate');
  let element = template.content.children[0].cloneNode(true);

  element.querySelector('.hotel__stars').textContent = data.stars;
  element.querySelector('.hotel__name').textContent = data.name;
  element.querySelector('.hotel__distance').textContent = data.distance;
  element.querySelector('.hotel__rating').textContent = data.rating;
  element.querySelector('.hotel__favourite').textContent = data.favourite;
  element.querySelector('.hotel__price').textContent = data.price;

  let backgroundImage = new Image();

  backgroundImage.onload = () => {
    element.style.backgroundImage = `url(./source/${data.preview})`;
  }

  backgroundImage.onerror = () => {
    element.classList.add('noimage');
  }

  element.style.backgroundImage = `url(./source/${data.preview})`;

  return element;
};

// hotels.forEach(hotel => {
//   const element = getElementFromTemplate(hotel);
//   container.appendChild(element);
// });

let loadedData = null;

function __jsonpCallback(hotels) {
  loadedData = hotels;
  console.dir(loadedData);
}

let scriptElement = document.createElement('script');
scriptElement.src = '/source/data/hotels.js';
document.body.appendChild(scriptElement);