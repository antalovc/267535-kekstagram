'use strict';

window.picture = (function () {

  var setElementPictureData = function (pictureData, pictureElement, imageSelector, likesSelector, commentSelector) {
    pictureElement.querySelector(imageSelector).src = pictureData.url;
    pictureElement.querySelector(likesSelector).textContent = pictureData.likes;
    pictureElement.querySelector(commentSelector).textContent = pictureData.comments.length;
  };

  var createPictureFromTemplate = function (pictureData, pictureTemplate, imageSelector) {
    var pictureElement = pictureTemplate.cloneNode(true);
    setElementPictureData(pictureData, pictureElement, imageSelector, '.picture-likes', '.picture-comments');
    return pictureElement;
  };

  return {
    setElementPictureData: setElementPictureData,
    createPictureFromTemplate: createPictureFromTemplate
  };

})();
