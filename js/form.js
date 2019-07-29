'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adAddressField = adForm.querySelector('#address');
  var adTypeField = adForm.querySelector('#type');
  var adPriceField = adForm.querySelector('#price');
  var adTimeInField = adForm.querySelector('#timein');
  var adTimeOutField = adForm.querySelector('#timeout');
  var adRoomsField = adForm.querySelector('#room_number');
  var adCapacityField = adForm.querySelector('#capacity');

  var submitButton = adForm.querySelector('.ad-form__submit');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var roomsToGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var isCapacityValid = function (rooms, capacity) {
    return roomsToGuests[rooms].some(function (value) {
      return value === capacity;
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

  var setAddress = function (x, y) {
    adAddressField.value = Math.round(x) + ', ' + Math.round(y);
  };

  var enableForm = function () {
    adForm.classList.remove('ad-form--disabled');

    window.util.enableFields(adFormFields);
  };

  var disableForm = function () {
    adForm.classList.add('ad-form--disabled');

    window.util.disableFields(adFormFields);
  };

  var initForm = function () {
    enableForm();
  };

  var resetForm = function () {
    adForm.reset();

    var minPrice = setPrice(adTypeField.value);
    adPriceField.placeholder = minPrice;
    adPriceField.min = minPrice;

    window.files.clear();
    disableForm();
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

  submitButton.addEventListener('click', function () {
    if (!isCapacityValid(adRoomsField.value, adCapacityField.value)) {
      adCapacityField.setCustomValidity('Выбранное число гостей недопустимо.');
    } else {
      adCapacityField.setCustomValidity('');
    }
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.pin.reset();
    window.map.deactivate();
    window.page.deactivate();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.data.save(formData, window.modal.successHandler, window.modal.errorHandler);
  });

  window.form = {
    setAddress: setAddress,
    init: initForm,
    reset: resetForm
  };
})();
