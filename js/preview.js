'use strict';

window.preview = (function () {

  var previewElement = document.querySelector('.gallery-overlay');
  var previewCloseElement = previewElement.querySelector('.gallery-overlay-close');

  var onEscPress = function (evt) {
    window.util.callIfEscEvent(evt, hide);
  };

  var onCloseEnterPress = function (evt) {
    window.util.callIfEnterEvent(evt, hide);
  };

  var show = function (picture) {
    window.picture.setElementData(picture, previewElement, '.gallery-overlay-image', '.likes-count', '.comments-count');
    document.addEventListener('keydown', onEscPress);
    previewCloseElement.addEventListener('keydown', onCloseEnterPress);
    previewCloseElement.addEventListener('click', hide);
    previewElement.classList.remove('hidden');
  };

  var hide = function () {
    document.removeEventListener('keydown', onEscPress);
    previewCloseElement.removeEventListener('keydown', onCloseEnterPress);
    previewCloseElement.removeEventListener('click', hide);
    previewElement.classList.add('hidden');
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
