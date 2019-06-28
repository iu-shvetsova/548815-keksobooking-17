'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFormFields = filterForm.querySelectorAll('fieldset, select');

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adAddressField = adForm.querySelector('#address');
  var adTypeField = adForm.querySelector('#type');
  var adPriceField = adForm.querySelector('#price');
  var adTimeInField = adForm.querySelector('#timein');
  var adTimeOutField = adForm.querySelector('#timeout');

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var disableForms = function () {
    var minPrice = setPrice(adTypeField.value);
    adPriceField.placeholder = minPrice;
    adPriceField.min = minPrice;

    adAddressField.value = Math.round((mainPin.offsetLeft + mainPin.offsetWidth / 2)) + ', ' + Math.round((mainPin.offsetTop + mainPin.offsetHeight / 2));

    filterFormFields.forEach(function (field) {
      field.disabled = true;
    });

    adFormFields.forEach(function (field) {
      field.disabled = true;
    });
  };

  window.enableForms = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    filterFormFields.forEach(function (field) {
      field.disabled = false;
    });

    adFormFields.forEach(function (field) {
      field.disabled = false;
    });
  };

  var setPrice = function (type) {
    switch (type) {
      case 'bungalo':
        return 0;
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
    }
    return 0;
  };

  adTypeField.addEventListener('change', function () {
    var minPrice = setPrice(adTypeField.value);
    adPriceField.placeholder = minPrice;
    adPriceField.min = minPrice;
  });

  adTimeInField.addEventListener('change', function () {
    var time = adTimeInField.value;
    adTimeOutField.value = time;
  });

  adTimeOutField.addEventListener('change', function () {
    var time = adTimeOutField.value;
    adTimeInField.value = time;
  });

  window.setAddress = function (x, y) {
    adAddressField.value = x + ', ' + y;
  };

  disableForms();
})();
