'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.data = {
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);

      xhr.open('GET', DATA_URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }
  };
})();
