'use strict';

(function () {
  var isActive = false;

  window.page = {
    activate: function () {
      if (isActive) {
        return;
      }

      isActive = true;

      window.map.activate();
      window.form.init();
    },
    deactivate: function () {
      isActive = false;

      // window.files.clear();
      window.form.reset();
    }
  };

  page.deactivate();
})();
