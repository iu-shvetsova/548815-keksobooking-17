'use strict';

(function () {
  var NUMBER_OF_PINS = 5;

  var pinParam = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var map = document.querySelector('.map');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.drawPins = function (ads) {
    document.querySelectorAll('.addedPin').forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });

    var fragment = document.createDocumentFragment();
    var pin;

    for (var i = 0; i < NUMBER_OF_PINS; i++) {
      pin = similarPinTemplate.cloneNode(true);

      pin.classList.add('addedPin');
      pin.style.left = (ads[i].location.x - pinParam.WIDTH / 2) + 'px';
      pin.style.top = (ads[i].location.y - pinParam.HEIGHT) + 'px';
      pin.querySelector('img').src = ads[i].author.avatar;
      pin.querySelector('img').alt = ads[i].offer.type;

      fragment.appendChild(pin);
    }

    map.appendChild(fragment);
  };
})();
