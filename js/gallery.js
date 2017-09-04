'use strict';

(function () {

  var OVERLAY_IMAGE_SELECTOR = 'img';

  var addPictureEvents = function () {
    var pictureElements = document.querySelectorAll('.picture');

    for (var k = 0; k < pictureElements.length; k++) {
      pictureElements[k].addEventListener('click', function (evt) {
        window.preview.showPreviewByUrl(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'));
        evt.preventDefault();
      });

      pictureElements[k].addEventListener('keydown', function (evt) {
        window.util.callIfEnterEvent(evt, function () {
          window.preview.showPreviewByUrl(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'));
          evt.preventDefault();
        });
      });
    }
  };

  var drawPictures = function (pictures) {
    window.picturesData = pictures;

    var picturesBlock = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture-template').content;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      var pictureElement = window.picture.createPictureFromTemplate(pictures[i], pictureTemplate, OVERLAY_IMAGE_SELECTOR);
      fragment.appendChild(pictureElement);
    }

    picturesBlock.appendChild(fragment);

    addPictureEvents();
  };

  window.backend.load(drawPictures, window.util.showErrorMessage);

})();
