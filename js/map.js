'use strict';

(function () {
  var X_MIN = 0;
  var X_MAX = 1200;
  var Y_MIN = 130;
  var Y_MAX = 630;

  var mainPinParam = {
    WIDTH: 65,
    HEIGHT: 87
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

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

      var pinCenterX = mainPin.offsetLeft - shift.x + mainPinParam.WIDTH / 2;
      var pinTopY = mainPin.offsetTop - shift.y;

      if ((pinCenterX >= X_MIN) && (pinCenterX <= X_MAX)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if ((pinTopY >= Y_MIN - mainPinParam.HEIGHT) && (pinTopY + mainPinParam.HEIGHT <= Y_MAX)) {
        mainPin.style.top = pinTopY + 'px';
      }

      window.form.setAddress(Math.round((mainPin.offsetLeft + mainPinParam.WIDTH / 2)), Math.round((mainPin.offsetTop + mainPinParam.HEIGHT)));
    };

    var onMouseUp = function () {
      window.page.activate();

      window.form.setAddress(Math.round((mainPin.offsetLeft + mainPinParam.WIDTH / 2)), Math.round((mainPin.offsetTop + mainPinParam.HEIGHT)));

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
