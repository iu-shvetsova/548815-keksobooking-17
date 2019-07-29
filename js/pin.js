'use strict';

(function () {
  var mainPinParams = {
    WIDTH: 65,
    HEIGHT: 87,
    START_HEIGHT: 65
  };

  var Coords = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var mainPin = document.querySelector('.map__pin--main');

  var initialCoords = {
    x: +mainPin.style.left.split('px')[0],
    y: +mainPin.style.top.split('px')[0]
  };

  var setAddressValue = function () {
    window.form.setAddress(mainPin.offsetLeft + mainPinParams.WIDTH / 2, mainPin.offsetTop + mainPinParams.HEIGHT);
  };

  var setInitialAddressValue = function () {
    window.form.setAddress(initialCoords.x + mainPinParams.WIDTH / 2, initialCoords.y + mainPinParams.START_HEIGHT / 2);
  };

  var resetPin = function () {
    mainPin.style.left = initialCoords.x + 'px';
    mainPin.style.top = initialCoords.y + 'px';

    setInitialAddressValue();
  };

  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCenterX = mainPin.offsetLeft - shift.x + mainPinParams.WIDTH / 2;
      var pinTopY = mainPin.offsetTop - shift.y;

      if ((pinCenterX >= Coords.X_MIN) && (pinCenterX <= Coords.X_MAX)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if ((pinTopY >= Coords.Y_MIN - mainPinParams.HEIGHT) && (pinTopY + mainPinParams.HEIGHT <= Coords.Y_MAX)) {
        mainPin.style.top = pinTopY + 'px';
      }

      setAddressValue();
    };

    var onMouseUp = function () {
      window.page.activate();

      setAddressValue();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    reset: resetPin
  };

  setInitialAddressValue();
})();
