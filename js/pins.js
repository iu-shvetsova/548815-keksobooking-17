'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;

  var pinParam = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var map = document.querySelector('.map__pins');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var deactivatePins = function () {
    var activePins = map.querySelectorAll('.map__pin--active');
    activePins.forEach(function (activePin) {
      activePin.classList.remove('map__pin--active');
    });
  };

  var onPinClick = function (pin, ad) {
    deactivatePins();
    pin.classList.add('map__pin--active');
    window.map.showCard(ad);
  };

  var renderPin = function (ad) {
    var pin = similarPinTemplate.cloneNode(true);

    pin.classList.add('similar-ad');
    pin.style.left = (ad.location.x - pinParam.WIDTH / 2) + 'px';
    pin.style.top = (ad.location.y - pinParam.HEIGHT) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.type;

    pin.addEventListener('click', function () {
      onPinClick(pin, ad);
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
    remove: removePins,
    deactivate: deactivatePins
  };
})();
