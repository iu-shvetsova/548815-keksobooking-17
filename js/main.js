'use strict';

var NUMBER_OF_ADS = 8;
var ads = [];
var pins = [];

var map = document.querySelector('.map');

var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinParam = {
  WIDTH: 50,
  HEIGHT: 70
};

var X_MIN = 0;
var X_MAX = map.offsetWidth;
var Y_MIN = 130;
var Y_MAX = 630;

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

var generatePins = function () {
  for (var i = 0; i < ads.length; i++) {
    pins[i] = {
      style: 'left: ' + (ads[i].location.x - pinParam.WIDTH / 2) + 'px; top: ' + (ads[i].location.y - pinParam.HEIGHT) + 'px;',
      avatar: ads[i].author.avatar,
      headline: ads[i].offer.type
    };
  }
};

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style = pin.style;
  pinElement.querySelector('img').src = pin.avatar;
  pinElement.querySelector('img').alt = pin.headline;

  return pinElement;
};

var drawPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }

  map.appendChild(fragment);
};

map.classList.remove('map--faded');

generateAds();
generatePins();
drawPins();
