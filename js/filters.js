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
    window.pins.draw(filteredAds);
  };

  window.filters = {
    init: function (ads) {
      initialAds = ads;
      window.pins.draw(initialAds);

      filterByType.addEventListener('change', onTypeChange);
    }
  };
})();
