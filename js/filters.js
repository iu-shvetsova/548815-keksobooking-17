'use strict';

(function () {
  var BREAK_CODE = -1;

  var initialAds = [];

  var filter = document.querySelector('.map__filters');
  var filtersFormSelects = filter.querySelectorAll('select');
  var filtersFormInputs = filter.querySelectorAll('input');

  var typeFilter = filter.querySelector('#housing-type');
  var priceFilter = filter.querySelector('#housing-price');
  var roomsFilter = filter.querySelector('#housing-rooms');
  var guestsFilter = filter.querySelector('#housing-guests');
  var featuresFilter = filter.querySelector('#housing-features');

  var features = featuresFilter.querySelectorAll('.map__checkbox');

  var filterByValue = function (value, name, ads) {
    if (value === 'any') {
      return ads;
    }
    return ads.filter(function (ad) {
      return ad.offer[name].toString() === value;
    });
  };

  var filterByPrice = function (ads) {
    switch (priceFilter.value) {
      case 'any':
        return ads;
      case 'low':
        return ads.filter(function (ad) {
          return ad.offer.price <= 10000;
        });
      case 'middle':
        return ads.filter(function (ad) {
          return (ad.offer.price > 10000) && (ad.offer.price <= 50000);
        });
      case 'high':
        return ads.filter(function (ad) {
          return ad.offer.price > 50000;
        });
    }
    return null;
  };

  var filterByFeatures = function (ads) {
    var checkedFeatures = [];
    var filteredAds = [];

    features.forEach(function (feature) {
      if (feature.checked) {
        checkedFeatures.push(feature);
      }
    });

    if (checkedFeatures.length === 0) {
      return ads;
    }

    ads.forEach(function (ad) {
      var i;
      for (i = 0; i < checkedFeatures.length; i++) {
        if (ad.offer.features.indexOf(checkedFeatures[i].value) === -1) {
          i = BREAK_CODE;
          break;
        }
      }
      if (i !== BREAK_CODE) {
        filteredAds.push(ad);
      }
    });

    return filteredAds;
  };

  var updatePins = function () {
    var filteredAds = initialAds;

    filteredAds = filterByValue(typeFilter.value, 'type', filteredAds);
    filteredAds = filterByValue(roomsFilter.value, 'rooms', filteredAds);
    filteredAds = filterByValue(guestsFilter.value, 'guests', filteredAds);
    filteredAds = filterByPrice(filteredAds);
    filteredAds = filterByFeatures(filteredAds);

    window.card.remove();
    window.pins.draw(filteredAds);
  };

  var onChange = window.util.debounce(function () {
    updatePins();
  });

  window.filters = {
    init: function (ads) {
      window.util.enableFields(filtersFormSelects);
      window.util.enableFields(filtersFormInputs);

      initialAds = ads;
      window.pins.draw(initialAds);

      filter.addEventListener('change', onChange);
    },
    reset: function () {
      window.util.disableFields(filtersFormSelects);
      window.util.disableFields(filtersFormInputs);

      filter.removeEventListener('change', onChange);
    }
  };
})();
