'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;

  var pinParam = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var map = document.querySelector('.map');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var pin = similarPinTemplate.cloneNode(true);

    pin.classList.add('similar-ad');
    pin.style.left = (ad.location.x - pinParam.WIDTH / 2) + 'px';
    pin.style.top = (ad.location.y - pinParam.HEIGHT) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.type;

    pin.addEventListener('click', function () {
      var card = window.card.render(ad);
      if (!window.card.isDrawn()) {
        map.appendChild(card);
      } else {
        window.card.remove();
        map.appendChild(card);
      }
    });

    return pin;
  };

  var drawPins = function (ads) {
    removePins();

    var fragment = document.createDocumentFragment();

    var amount = ads.length < MAX_NUMBER_OF_PINS ? ads.length : MAX_NUMBER_OF_PINS;

    for (var i = 0; i < amount; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }

    map.appendChild(fragment);
  };

  var removePins = function () {
    document.querySelectorAll('.similar-ad').forEach(function (pin) {
      pin.remove();
    });
  };

  window.pins = {
    draw: drawPins,
    remove: removePins
  };
})();
