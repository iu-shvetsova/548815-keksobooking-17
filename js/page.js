'use strict';

(function () {
  var isActive = false;

  var successHandler = function (ads) {
    window.filters.init(ads);
  };

  window.page = {
    activate: function () {
      if (isActive) {
        return;
      }

      isActive = true;

      window.forms.enable();
      window.data.load(successHandler, window.modal.errorHandler);
    },
    deactivate: function () {
      isActive = false;

      window.card.remove();
      window.pins.remove();
      window.map.resetMainPin();
      window.forms.disable();
    }
  };
})();
