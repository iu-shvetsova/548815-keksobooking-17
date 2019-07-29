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
      window.forms.enable();
    },
    deactivate: function () {
      isActive = false;

      window.files.clear();
      window.forms.disable();
      // window.map.deactivate();
    }
  };

  page.deactivate();
})();
