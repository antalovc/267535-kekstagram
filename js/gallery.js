'use strict';

window.gallery = (function () {

  var OVERLAY_IMAGE_SELECTOR = 'img';

  var pictures = null;

  var containerElement = document.querySelector('.pictures');
  var templateElement = document.querySelector('#picture-template').content;

  var addEvents = function (element) {
    element.addEventListener('click', function (evt) {
      window.preview.show(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'), pictures);
      evt.preventDefault();
    });

    element.addEventListener('keydown', function (evt) {
      window.util.callIfEnterEvent(evt, function () {
        window.preview.show(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'), pictures);
        evt.preventDefault();
      });
    });
  };

  var initializeEvents = function () {
    containerElement.querySelectorAll('.picture').forEach(function (element) {
      addEvents(element);
    });
  };

  var draw = function (filterFunction) {
    var picturesToDraw = pictures.slice();
    if (typeof filterFunction === 'function') {
      picturesToDraw = filterFunction(picturesToDraw);
    }

    var fragment = document.createDocumentFragment();
    picturesToDraw.forEach(function (picture) {
      var pictureElement = window.picture.createFromTemplate(picture, templateElement, OVERLAY_IMAGE_SELECTOR);
      fragment.appendChild(pictureElement);
    });

    containerElement.innerHTML = '';
    containerElement.appendChild(fragment);

    initializeEvents();
  };

  window.backend.load(function (data) {
    pictures = data;
    draw();
    document.querySelector('.filters').classList.remove('hidden');
  }, window.errorMessage.show);

  return {
    draw: draw
  };

})();
