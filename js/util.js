'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_KEYCODE = 27;

  var onEscPress = function (evt, callback) {
    if (evt.keyCode === ESC_KEYCODE) {
      callback();
    }
  };

  var debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var enableFields = function (fields) {
    fields.forEach(function (field) {
      field.disabled = false;
    });
  };

  var disableFields = function (fields) {
    fields.forEach(function (field) {
      field.disabled = true;
    });
  };

  window.util = {
    onEscPress: onEscPress,
    debounce: debounce,
    enableFields: enableFields,
    disableFields: disableFields
  };
})();
