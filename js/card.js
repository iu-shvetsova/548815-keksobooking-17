'use strict';

(function () {
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var getType = function (type) {
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

  var setFeatures = function (section, features) {
    section.innerHTML = '';
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var currentFeature = document.createElement('li');
      var className = 'popup__feature--' + feature;
      currentFeature.classList.add('popup__feature');
      currentFeature.classList.add(className);
      fragment.appendChild(currentFeature);
    });
    section.appendChild(fragment);
  };

  var setPhotos = function (section, photos) {
    var template = section.querySelector('.popup__photo');
    section.removeChild(template);

    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var currentPhoto = template.cloneNode(true);
      currentPhoto.src = photo;
      fragment.appendChild(currentPhoto);
    });
    section.appendChild(fragment);
  };

  var onCardClose = function () {
    window.pins.deactivate();
    window.card.remove();
  };

  var onCardEscPress = function (evt) {
    window.pins.deactivate();
    window.util.onEscPress(evt, window.card.remove);
  };

  var renderCard = function (ad) {
    var card = similarCardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = getType(ad.offer.type);
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;

    setFeatures(card.querySelector('.popup__features'), ad.offer.features);
    setPhotos(card.querySelector('.popup__photos'), ad.offer.photos);

    card.querySelector('.popup__close').addEventListener('click', onCardClose);
    document.addEventListener('keydown', onCardEscPress);

    return card;
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      document.removeEventListener('keydown', onCardEscPress);
      card.remove();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
