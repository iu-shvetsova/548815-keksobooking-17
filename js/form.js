'use strict';

(function () {
  var filterForm = document.querySelector('.map__filters');
  var filterFormFields = filterForm.querySelectorAll('fieldset, select');
  // var filterByType = document.querySelector('#housing-type');

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

  // filterByType.addEventListener('change', function () {
  //   var filteredAds;
  //   if (filterByType.value === 'any') {
  //     filteredAds = window.allAds;
  //   } else {
  //     filteredAds = window.allAds.filter(function (ad) {
  //       return ad.offer.type === filterByType.value;
  //     });
  //   }
  //   // console.log(filteredAds);
  //   window.pin.removePins();
  //   window.pin.drawPins(filteredAds);
  // });

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

  window.form = {
    setAddress: function (x, y) {
      adAddressField.value = x + ', ' + y;
    },
    enableForms: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      filterFormFields.forEach(function (field) {
        field.disabled = false;
      });

      adFormFields.forEach(function (field) {
        field.disabled = false;
      });
    }
  };

  disableForms();
})();
