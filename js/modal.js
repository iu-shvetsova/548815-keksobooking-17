'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var mainSection = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var drawPopup = function (template, section) {
    var popup = template.cloneNode(true);

    var closePopup = function () {
      section.removeChild(popup);
    };

    section.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    });

    return popup;
  }

  window.modal = {
    errorHandler: function (errorMessage) {
      var fragment = document.createDocumentFragment();

      var errorPopup = drawPopup(errorTemplate, mainSection);
      errorPopup.querySelector('.error__message').textContent = errorMessage;

      fragment.appendChild(errorPopup);
      mainSection.appendChild(fragment);
    },
    successHandler: function () {
      var fragment = document.createDocumentFragment();

      var successPopup = drawPopup(successTemplate, mainSection);

      fragment.appendChild(errorPopup);
      mainSection.appendChild(fragment);
    }
  }
})();
