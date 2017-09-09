'use strict';

window.gallery = (function () {

  var OVERLAY_IMAGE_SELECTOR = 'img';

  var picturesData = null;

  var addPictureEvents = function () {
    var pictureElements = document.querySelectorAll('.picture');

    for (var k = 0; k < pictureElements.length; k++) {
      pictureElements[k].addEventListener('click', function (evt) {
        window.preview.showPreviewByUrl(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'), picturesData);
        evt.preventDefault();
      });

      pictureElements[k].addEventListener('keydown', function (evt) {
        window.util.callIfEnterEvent(evt, function () {
          window.preview.showPreviewByUrl(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'), picturesData);
          evt.preventDefault();
        });
      });
    }
  };

  var drawGallery = function (filterFunction) {

    var picturesToDraw = picturesData.slice();
    if (typeof filterFunction === 'function') {
      picturesToDraw = filterFunction(picturesToDraw);
    }

    var picturesBlock = document.querySelector('.pictures');
    var pictureTemplate = document.querySelector('#picture-template').content;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picturesToDraw.length; i++) {
      var pictureElement = window.picture.createPictureFromTemplate(picturesToDraw[i], pictureTemplate, OVERLAY_IMAGE_SELECTOR);
      fragment.appendChild(pictureElement);
    }

    picturesBlock.innerHTML = '';
    picturesBlock.appendChild(fragment);

    addPictureEvents();
  };

  window.backend.load(function (pictures) {
    picturesData = pictures;
    drawGallery();
    document.querySelector('.filters').classList.remove('hidden');
  }, window.util.showErrorMessage);

  return {
    drawGallery: drawGallery
  };

})();
