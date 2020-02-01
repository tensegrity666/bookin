'Use strict';

const container = document.querySelector('.hotels-list');
const IMAGE_TIMEOUT = 10000;

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

  const imageLoadTimeout = setTimeout(() => {
    backgroundImage.src = null;
    element.classList.add('noimage');
  }, IMAGE_TIMEOUT);

  backgroundImage.onload = () => {
    clearTimeout(imageLoadTimeout);
    element.style.backgroundImage = `url(${backgroundImage.src})`;
  }
  backgroundImage.onerror = () => {
    element.style.backgroundImage = null;
    element.classList.add('noimage');
  }
  backgroundImage.src = data.preview;
  return element;
};

getHotels();

function renderHotels(hotels) {
  hotels.forEach(hotel => {
    const element = getElementFromTemplate(hotel);
    container.appendChild(element);
  });
}

function getHotels() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './source/data/hotels.json');
  xhr.timeout = 10000;
  xhr.onload = event => {
    let rawData = event.target.response;
    let loadedData = JSON.parse(rawData);
    renderHotels(loadedData);
  }
  xhr.send();
}

// ! JSONP
// let loadedData = null;
// function __jsonpCallback(hotels) {
//   loadedData = hotels;
//   return renderLoadedDataToConsole();
// }

// function renderLoadedDataToConsole() {
//   console.dir(loadedData);
// }

// let scriptElement = document.createElement('script');
// scriptElement.src = './source/data/hotels.js';
// document.body.appendChild(scriptElement);