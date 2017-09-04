'use strict';

window.backend = (function () {

  var XHR_TIMEOUT = 5000;

  var URL_LOAD = 'https://1510.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://1510.dump.academy/kekstagram';

  var sendXhrRequest = function (type, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        default:
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + XHR_TIMEOUT + 'мс');
    });

    var isPost = type === 'POST';
    xhr.open(type, isPost ? URL_SAVE : URL_LOAD);
    xhr.send(isPost ? data : null);
  };

  return {

    load: function (onLoad, onError) {
      sendXhrRequest('GET', onLoad, onError);
    },

    save: function (data, onSuccess, onError) {
      sendXhrRequest('POST', onSuccess, onError, data);
    }

  };
})();
