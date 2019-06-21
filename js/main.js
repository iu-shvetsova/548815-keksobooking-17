'use strict';

var isActive = false;

var filterForm = document.querySelector('.map__filters');
var filterFormFields = filterForm.querySelectorAll('fieldset, select');

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.querySelectorAll('fieldset');
var adAddress = adForm.querySelector('#address');

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var NUMBER_OF_ADS = 8;
var ads = [];

var pinParam = {
  WIDTH: 50,
  HEIGHT: 70
};

var X_MIN = 0;
var X_MAX = map.offsetWidth;
var Y_MIN = 130;
var Y_MAX = 630;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var disableForms = function () {
  adAddress.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

  for (var i = 0; i < filterFormFields.length; i++) {
    filterFormFields[i].disabled = true;
  }

  for (var i = 0; i < adFormFields.length; i++) {
    adFormFields[i].disabled = true;
  }
};

var enableForms = function () {
  for (var i = 0; i < filterFormFields.length; i++) {
    filterFormFields[i].disabled = false;
  }

  for (var i = 0; i < adFormFields.length; i++) {
    adFormFields[i].disabled = false;
  }
}

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

var generateAds = function () {
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    ads[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: getRandomElement(OFFER_TYPES)
      },
      location: {
        x: getRandomNumber(X_MIN, X_MAX),
        y: getRandomNumber(Y_MIN, Y_MAX)
      }
    };
  }
};

var drawPins = function () {
  var fragment = document.createDocumentFragment();
  var pin;

  for (var i = 0; i < ads.length; i++) {
    pin = similarPinTemplate.cloneNode(true);

    pin.style.left = (ads[i].location.x - pinParam.WIDTH / 2) + 'px';
    pin.style.top = (ads[i].location.y - pinParam.HEIGHT) + 'px';
    pin.querySelector('img').src = ads[i].author.avatar;
    pin.querySelector('img').alt = ads[i].offer.type;

    fragment.appendChild(pin);
  }

  map.appendChild(fragment);
};

mainPin.addEventListener('click', function () {
  if (isActive === false) {
    isActive = true;

    enableForms();

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    generateAds();
    drawPins();
  }
});

disableForms();
