'use strict';

(function () {
  var map = document.querySelector('.map');

  var X_MIN = 0;
  var X_MAX = map.offsetWidth;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var NUMBER_OF_ADS = 8;

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElement = function (elements) {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  window.generateAds = function () {
    var ads = [];
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
    return ads;
  };
})();
