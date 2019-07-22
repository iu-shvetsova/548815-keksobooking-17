'use strict';

(function () {
  var initialAds = [];

  var filterByType = document.querySelector('#housing-type');
  var filterByPrice = document.querySelector('#housing-price');
  var filterByRooms = document.querySelector('#housing-rooms');
  var filterByGuests = document.querySelector('#housing-guests');
  var filterByFeatures = document.querySelector('#housing-features');

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
      checkedFeatures.forEach(function (checkedFeature) {
        if (ad.offer.features.some(function (feature) {
          return feature === checkedFeature.value;
        })) {
          filteredAds.push(ad);
        }
      });
    });

    return filteredAds;

  };

  var onChange = function () {
    var filteredAds = initialAds;

    filteredAds = getAdsByType(filteredAds);
    filteredAds = getAdsByRooms(filteredAds);
    filteredAds = getAdsByGuests(filteredAds);
    filteredAds = getAdsByPrice(filteredAds);
    filteredAds = getAdsByFeatures(filteredAds);

    window.pins.draw(filteredAds);
  };

  window.filters = {
    init: function (ads) {
      initialAds = ads;
      window.pins.draw(initialAds);

      filterByType.addEventListener('change', onChange);
      filterByRooms.addEventListener('change', onChange);
      filterByGuests.addEventListener('change', onChange);
      filterByPrice.addEventListener('change', onChange);
      features.forEach(function (feature) {
        feature.addEventListener('click', onChange);
      });
    }
  };
})();
