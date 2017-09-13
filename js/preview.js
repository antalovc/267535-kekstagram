'use strict';

window.preview = (function () {

  var overlay = document.querySelector('.gallery-overlay');
  var closeElement = overlay.querySelector('.gallery-overlay-close');

  var onEscPress = function (evt) {
    window.util.callIfEscEvent(evt, hide);
  };

  var onCloseEnterPress = function (evt) {
    window.util.callIfEnterEvent(evt, hide);
  };

  var show = function (picture) {
    window.picture.setElementData(picture, overlay, '.gallery-overlay-image', '.likes-count', '.comments-count');
    document.addEventListener('keydown', onEscPress);
    closeElement.addEventListener('keydown', onCloseEnterPress);
    closeElement.addEventListener('click', hide);
    overlay.classList.remove('hidden');
  };

  var hide = function () {
    document.removeEventListener('keydown', onEscPress);
    closeElement.removeEventListener('keydown', onCloseEnterPress);
    closeElement.removeEventListener('click', hide);
    overlay.classList.add('hidden');
  };

  return {

    show: function (url, data) {
      var pictureData = data.find(function (picture) {
        return picture.url === url;
      });
      show(pictureData);
    }

  };

})();
