'use strict';

(function () {
  var map = document.querySelector('.map');

  var successHandler = function (ads) {
    window.filters.init(ads);
  };

  var activateMap = function () {
    map.classList.remove('map--faded');

    window.data.load(successHandler, window.modal.errorHandler);
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');

    window.filters.reset();
    window.pins.remove();
    window.card.remove();
  };

  var showCard = function (ad) {
    var card = window.card.render(ad);
    window.card.remove();
    map.appendChild(card);
  };

  window.map = {
    showCard: showCard,
    activate: activateMap,
    deactivate: deactivateMap
  };
})();
