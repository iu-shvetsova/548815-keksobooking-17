'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var filterForm = document.querySelector('.map__filters');
  var filterFormFields = filterForm.querySelectorAll('fieldset, select');

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.querySelectorAll('fieldset');
  var adTitleField = adForm.querySelector('#title');
  var adAddressField = adForm.querySelector('#address');
  var adTypeField = adForm.querySelector('#type');
  var adPriceField = adForm.querySelector('#price');
  var adTimeInField = adForm.querySelector('#timein');
  var adTimeOutField = adForm.querySelector('#timeout');
  var adRoomsField = adForm.querySelector('#room_number');
  var adCapacityField = adForm.querySelector('#capacity');
  var adDescriptionField = adForm.querySelector('#description');
  var adFormFeatures = adForm.querySelectorAll('.feature__checkbox');
  var adPhotosChooser = adForm.querySelector('.ad-form__upload input[type=file]');
  var adPhotoPreviewsList = adForm.querySelector('.ad-form__photo-container');

  var submitButton = adForm.querySelector('.ad-form__submit');

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

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

  var generatePreview = function (file) {
    var reader = new FileReader();

    var preview = document.createElement('div');
    preview.classList.add('ad-form__photo');
    preview.classList.add('ad-form__photo--added');
    preview.style.backgroundSize = 'cover';

    reader.addEventListener('load', function () {
      preview.style.backgroundImage = 'url(' + reader.result + ')';
    });

    reader.readAsDataURL(file);

    return preview;
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

  adPhotosChooser.addEventListener('change', function () {
    if (!adPhotoPreviewsList.querySelector('.ad-form__photo--added')) {
      adPhotoPreviewsList.querySelector('.ad-form__photo').remove();
    }

    var files = adPhotosChooser.files;
    var filesNames = [];

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < files.length; i++) {
      filesNames[i] = files[i].name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return filesNames[i].endsWith(it);
      });

      if (matches) {
        fragment.appendChild(generatePreview(files[i]));
      }
    }

    adPhotoPreviewsList.appendChild(fragment);
  });

  submitButton.addEventListener('click', function () {
    if (!isCapacityValid(adRoomsField.value, adCapacityField.value)) {
      adCapacityField.setCustomValidity('Выбранное число гостей недопустимо.');
    } else {
      adCapacityField.setCustomValidity('');
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.data.save(formData, window.modal.successHandler, window.modal.errorHandler);
  });

  adForm.addEventListener('reset', function (evt) {
    evt.preventDefault();
    window.page.deactivate();
  });

  window.forms = {
    setAddress: function (x, y) {
      adAddressField.value = x + ', ' + y;
    },
    enable: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      filterFormFields.forEach(function (field) {
        field.disabled = false;
      });

      adFormFields.forEach(function (field) {
        field.disabled = false;
      });
    },
    disable: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      adForm.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';

      adTitleField.value = '';
      adDescriptionField.value = '';

      var minPrice = setPrice(adTypeField.value);
      adPriceField.value = '';
      adPriceField.placeholder = minPrice;
      adPriceField.min = minPrice;

      adAddressField.value = Math.round((mainPin.offsetLeft + mainPin.offsetWidth / 2)) + ', ' + Math.round((mainPin.offsetTop + mainPin.offsetHeight / 2));

      var photos = adPhotoPreviewsList.querySelectorAll('.ad-form__photo--added');
      if (photos.length > 0) {
        photos.forEach(function (photo) {
          photo.remove();
        });

        var emptyPreview = document.createElement('div');
        emptyPreview.classList.add('ad-form__photo');
        adPhotoPreviewsList.appendChild(emptyPreview);
      }

      adFormFeatures.forEach(function (feature) {
        feature.checked = false;
      });

      filterFormFields.forEach(function (field) {
        field.disabled = true;
      });

      adFormFields.forEach(function (field) {
        field.disabled = true;
      });
    }
  };

  window.forms.disable();
})();
