'use strict';

(function () {
  var initialAds = [];

  var filterByType = document.querySelector('#housing-type');

  var onTypeChange = function () {
    var filteredAds;
    if (filterByType.value === 'any') {
      filteredAds = initialAds;
    } else {
      filteredAds = initialAds.filter(function (ad) {
        return ad.offer.type === filterByType.value;
      });
    }
    window.pin.removePins();
    window.pin.drawPins(filteredAds);
  };

  filterByType.addEventListener('change', onTypeChange);

  window.filters = {
    init: function (ads) {
      initialAds = ads;
    }
  };
})();
