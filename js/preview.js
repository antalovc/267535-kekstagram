'use strict';

window.preview = (function () {

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  var onGalleryOverlayEscPress = function (evt) {
    window.util.callIfEscEvent(evt, hideGalleryOverlay);
  };

  var onGalleryOverlayCloseEnterPress = function (evt) {
    window.util.callIfEnterEvent(evt, hideGalleryOverlay);
  };

  var showPreview = function (picture) {
    window.picture.setElementPictureData(picture, galleryOverlay, '.gallery-overlay-image', '.likes-count', '.comments-count');
    document.addEventListener('keydown', onGalleryOverlayEscPress);
    galleryOverlayClose.addEventListener('keydown', onGalleryOverlayCloseEnterPress);
    galleryOverlayClose.addEventListener('click', hideGalleryOverlay);
    galleryOverlay.classList.remove('hidden');
  };

  var hideGalleryOverlay = function () {
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
    galleryOverlayClose.removeEventListener('keydown', onGalleryOverlayCloseEnterPress);
    galleryOverlayClose.removeEventListener('click', hideGalleryOverlay);
    galleryOverlay.classList.add('hidden');
  };

  return {

    showPreviewByUrl: function (picturesData, pictureUrl) {
      var pictureData = picturesData.find(function (picture) {
        return picture.url === pictureUrl;
      });
      showPreview(pictureData);
    }

  };

})();
