'use strict';

(function () {
  var isActive = false;

  // window.allAds = [];

  var successHandler = function (ads) {
    // window.allAds = ads;
    window.filters.init(ads);
    window.pin.drawPins(ads);
  };

  window.page = {
    activate: function () {
      if (isActive) {
        return;
      }

      isActive = true;

      window.form.enableForms();
      window.load(successHandler, window.errorHandler);
    },
    deactivate: function () {
      isActive = false;
    }
  };
})();
