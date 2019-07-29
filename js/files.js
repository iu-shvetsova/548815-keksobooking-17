'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var AVATAR_URL = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('.ad-form-header__input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photosChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewsList = document.querySelector('.ad-form__photo-container');

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

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosChooser.addEventListener('change', function () {
    if (!photoPreviewsList.querySelector('.ad-form__photo--added')) {
      photoPreviewsList.querySelector('.ad-form__photo').remove();
    }

    var files = photosChooser.files;
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

    photoPreviewsList.appendChild(fragment);
  });

  var clear = function () {
    avatarPreview.src = AVATAR_URL;

    var photos = photoPreviewsList.querySelectorAll('.ad-form__photo--added');
    if (photos.length > 0) {
      photos.forEach(function (photo) {
        photo.remove();
      });

      var emptyPreview = document.createElement('div');
      emptyPreview.classList.add('ad-form__photo');
      photoPreviewsList.appendChild(emptyPreview);
    }
  };

  window.files = {
    clear: clear
  };
})();
