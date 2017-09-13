'use strict';

window.picture = (function () {

  var setElementData = function (pictureData, pictureElement, imageSelector, likesSelector, commentSelector) {
    pictureElement.querySelector(imageSelector).src = pictureData.url;
    pictureElement.querySelector(likesSelector).textContent = pictureData.likes;
    pictureElement.querySelector(commentSelector).textContent = pictureData.comments.length;
  };

  var createFromTemplate = function (pictureData, pictureTemplate, imageSelector) {
    var pictureElement = pictureTemplate.cloneNode(true);
    setElementData(pictureData, pictureElement, imageSelector, '.picture-likes', '.picture-comments');
    return pictureElement;
  };

  return {
    setElementData: setElementData,
    createFromTemplate: createFromTemplate
  };

})();
