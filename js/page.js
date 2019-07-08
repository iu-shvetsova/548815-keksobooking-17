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

      window.form.enableForms();
      window.load(successHandler, window.errorHandler);
    },
    deactivate: function () {
      isActive = false;
    }
  };
})();
