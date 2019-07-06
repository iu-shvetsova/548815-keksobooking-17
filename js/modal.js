'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.errorHandler = function (errorMessage) {
    var fragment = document.createDocumentFragment();
    var errorPopup = errorTemplate.cloneNode(true);

    var closePopup = function () {
      mainSection.removeChild(errorPopup);
    };

    mainSection.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    });

    errorPopup.querySelector('.error__message').textContent = errorMessage;

    fragment.appendChild(errorPopup);
    mainSection.appendChild(fragment);
  };
})();
