'use strict';

(function () {
  var BREAK_CODE = -1;

  var initialAds = [];

  var filter = document.querySelector('.map__filters');

  var filterByType = filter.querySelector('#housing-type');
  var filterByPrice = filter.querySelector('#housing-price');
  var filterByRooms = filter.querySelector('#housing-rooms');
  var filterByGuests = filter.querySelector('#housing-guests');
  var filterByFeatures = filter.querySelector('#housing-features');

  var features = filterByFeatures.querySelectorAll('.map__checkbox');

  var getAdsByType = function (ads) {
    if (filterByType.value === 'any') {
      return ads;
    }
    return ads.filter(function (ad) {
      return ad.offer.type === filterByType.value;
    });
  };

  var getAdsByRooms = function (ads) {
    if (filterByRooms.value === 'any') {
      return ads;
    }
    return ads.filter(function (ad) {
      return ad.offer.rooms.toString() === filterByRooms.value;
    });
  };

  var getAdsByGuests = function (ads) {
    if (filterByGuests.value === 'any') {
      return ads;
    }
    return ads.filter(function (ad) {
      return ad.offer.guests.toString() === filterByGuests.value;
    });
  };

  var getAdsByPrice = function (ads) {
    switch (filterByPrice.value) {
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

  var getAdsByFeatures = function (ads) {
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

    filteredAds = getAdsByType(filteredAds);
    filteredAds = getAdsByRooms(filteredAds);
    filteredAds = getAdsByGuests(filteredAds);
    filteredAds = getAdsByPrice(filteredAds);
    filteredAds = getAdsByFeatures(filteredAds);

    window.card.remove();
    window.pins.draw(filteredAds);
  };

  var onChange = window.util.debounce(function () {
    updatePins();
  });

  window.filters = {
    init: function (ads) {
      initialAds = ads;
      window.pins.draw(initialAds);

      filter.addEventListener('change', onChange);
    }
  };
})();
