'use strict';

(function () {
  var initialAds = [];

  var filter = document.querySelector('.map__filters');
  var filtersFormSelects = filter.querySelectorAll('select');
  var filtersFormInputs = filter.querySelectorAll('input');

  var typeFilter = filter.querySelector('#housing-type');
  var priceFilter = filter.querySelector('#housing-price');
  var roomsFilter = filter.querySelector('#housing-rooms');
  var guestsFilter = filter.querySelector('#housing-guests');
  var featuresFilter = filter.querySelector('#housing-features');

  var featuresList = featuresFilter.querySelectorAll('.map__checkbox');
  var features = Array.prototype.slice.call(featuresList);

  var Prices = {
    LOW: 10000,
    HIGH: 50000
  };

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
          return ad.offer.price <= Prices.LOW;
        });
      case 'middle':
        return ads.filter(function (ad) {
          return (ad.offer.price > Prices.LOW) && (ad.offer.price <= Prices.HIGH);
        });
      case 'high':
        return ads.filter(function (ad) {
          return ad.offer.price > Prices.HIGH;
        });
    }
    return null;
  };

  var filterByFeatures = function (ads) {
    var checkedFeatures = [];
    var filteredAds = [];

    checkedFeatures = features.filter(function (feature) {
      return feature.checked;
    });

    if (checkedFeatures.length === 0) {
      return ads;
    }

    ads.forEach(function (ad) {
      var i;
      for (i = 0; i < checkedFeatures.length; i++) {
        if (ad.offer.features.indexOf(checkedFeatures[i].value) === -1) {
          return;
        }
      }
      filteredAds.push(ad);
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

  var initFilters = function (ads) {
    window.util.enableFields(filtersFormSelects);
    window.util.enableFields(filtersFormInputs);

    initialAds = ads;
    window.pins.draw(initialAds);

    filter.addEventListener('change', onChange);
  };

  var resetFilters = function () {
    window.util.disableFields(filtersFormSelects);
    window.util.disableFields(filtersFormInputs);

    filter.removeEventListener('change', onChange);
  };

  window.filters = {
    init: initFilters,
    reset: resetFilters
  };
})();
