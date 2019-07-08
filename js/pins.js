'use strict';

(function () {
  var MAX_NUMBER_OF_PINS = 5;

  var pinParam = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var map = document.querySelector('.map');

  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var setType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
    }
    return '';
  };

  var drawPins = function (ads) {
    removePins();

    var fragment = document.createDocumentFragment();

    var amount = ads.length < MAX_NUMBER_OF_PINS ? ads.length : MAX_NUMBER_OF_PINS;

    for (var i = 0; i < amount; i++) {
      var pin = similarPinTemplate.cloneNode(true);

      pin.classList.add('similar-ad');
      pin.style.left = (ads[i].location.x - pinParam.WIDTH / 2) + 'px';
      pin.style.top = (ads[i].location.y - pinParam.HEIGHT) + 'px';
      pin.querySelector('img').src = ads[i].author.avatar;
      pin.querySelector('img').alt = ads[i].offer.type;

      pin.addEventListener('click', function () {
        var cardsContainer = document.createDocumentFragment();
        var card = similarCardTemplate.cloneNode(true);

        card.querySelector('.popup__avatar').src = ads[0].author.avatar;
        card.querySelector('.popup__title').textContent = ads[0].offer.title;
        card.querySelector('.popup__text--address').textContent = ads[0].offer.address;
        card.querySelector('.popup__text--price').textContent = ads[0].offer.price + '₽/ночь';
        card.querySelector('.popup__type').textContent = setType(ads[0].offer.type);
        card.querySelector('.popup__text--capacity').textContent = ads[0].offer.rooms + ' комнаты для ' + ads[0].offer.guests + ' гостей';
        card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;

        var featuresSection = card.querySelector('.popup__features');
        featuresSection.innerHTML = '';
        var featuresContainer = document.createDocumentFragment();
        ads[0].offer.features.forEach(function (feature) {
          var currentFeature = document.createElement('li');
          var className = 'popup__feature--' + feature;
          currentFeature.classList.add('popup__feature');
          currentFeature.classList.add(className);
          featuresContainer.appendChild(currentFeature);
        });
        featuresSection.appendChild(featuresContainer);

        card.querySelector('.popup__description').textContent = ads[0].offer.description;

        var photosSection = card.querySelector('.popup__photos');
        var photosContainer = document.createDocumentFragment();
        ads[0].offer.photos.forEach(function (photo) {
          var currentPhoto = photosSection.querySelector('.popup__photo').cloneNode(true);
          currentPhoto.src = photo;
          photosContainer.appendChild(currentPhoto);
        });
        photosSection.removeChild(photosSection.querySelectorAll('.popup__photo')[0]);
        photosSection.appendChild(photosContainer);

        cardsContainer.appendChild(card);
        map.appendChild(cardsContainer);
      });

      fragment.appendChild(pin);
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
