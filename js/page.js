'use strict';

(function () {
  var isActive = false;

  var activatePage = function () {
    if (isActive) {
      return;
    }

    isActive = true;

    window.form.init();
    window.map.activate();
  };

  var deactivatePage = function () {
    isActive = false;

    window.form.reset();
    window.map.deactivate();
  };

  deactivatePage();

  window.page = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
