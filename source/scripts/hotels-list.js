'Use strict';

  const TIMEOUT = 10000;
  const ACTIVE_FILTER = 'filter-all';
  const container = document.querySelector('.hotels-list');
  const filters = document.querySelectorAll('.hotel-filter');
  let hotels = [];

  for (let i = 0; i < filters.length; ++i) {
    filters[i].onclick = event => {
      let clickedId = event.target.id;
      setFilter(clickedId);
    }
  }

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
      backgroundImage.src = '';
      element.classList.add('noimage');
    }, TIMEOUT);

    backgroundImage.onload = () => {
      clearTimeout(imageLoadTimeout);
      element.style.backgroundImage = `url(${backgroundImage.src})`;
    }
    backgroundImage.onerror = () => {
      element.style.backgroundImage = '';
      element.classList.add('noimage');
    }
    backgroundImage.src = data.preview;
    return element;
  };

  getHotels();

  function renderHotels(hotelsToRender) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    hotelsToRender.forEach(hotel => {
      const element = getElementFromTemplate(hotel);
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
  }

  function getHotels() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './source/data/hotels.json');
    xhr.timeout = TIMEOUT;
    xhr.onload = event => {
      let rawData = event.target.response;
      hotels = JSON.parse(rawData);
      renderHotels(hotels);
    }
    xhr.send();
  }

  function setFilter(id) {
    // if (ACTIVE_FILTER === id) {
    //   return;
    // }
    // document.getElementById(id).setAttribute('checked', 'true');
    // document.getElementById(ACTIVE_FILTER).removeAttribute('checked');

    let filtered = hotels.slice(0);

    switch (id) {
      case 'filter-expensive':
        filtered = filtered.sort((a, b) => b.price - a.price);
      break;
      case 'filter-cheap':
        filtered = filtered.sort((a, b) => a.price - b.price);
      break;
      case 'filter-stars':
        filtered = filtered.sort((a, b) => b.stars - a.stars);
      break;
      case 'filter-all':
        filtered = hotels;
    }
    renderHotels(filtered);
  }
