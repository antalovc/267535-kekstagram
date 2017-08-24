'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var PICTURES_NUMBER = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 2;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var OVERLAY_IMAGE_SELECTOR = 'img';

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

var generateRandomIntegerFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateIndexesPermutation = function (nElements) {
  var res = [];
  for (var i = 1; i <= nElements; i++) {
    res.push(i);
  }

  var tmp = 0;
  var randomId = 0;
  for (var j = 0; j < nElements; j++) {
    randomId = generateRandomIntegerFromRange(0, nElements - 1);
    tmp = res[j];
    res[j] = res[randomId];
    res[randomId] = tmp;
  }

  return res;
};

var generatePictureComments = function (possibleCommentsArray, nMinComments, nMaxComments) {
  var nComments = generateRandomIntegerFromRange(nMinComments, nMaxComments);
  var comments = [];
  var commentsIndexesArray = [];
  var newCommentIndex = 0;

  while (commentsIndexesArray.length < nComments) {
    newCommentIndex = generateRandomIntegerFromRange(0, possibleCommentsArray.length - 1);
    if (commentsIndexesArray.indexOf(newCommentIndex) === -1) {
      commentsIndexesArray.push(newCommentIndex);
    }
  }

  for (var i = 0; i < nComments; i++) {
    comments.push(possibleCommentsArray[commentsIndexesArray[i]]);
  }
  return comments;
};

var generatePictureData = function (nPictures, nLikesMin, nLikesMax, comments, nMinComments, nMaxComments) {
  var res = [];

  var indexesPermutation = generateIndexesPermutation(PICTURES_NUMBER);
  for (var i = 0; i < nPictures; i++) {
    res.push({
      url: 'photos/' + indexesPermutation[i] + '.jpg',
      likes: generateRandomIntegerFromRange(nLikesMin, nLikesMax),
      comments: generatePictureComments(comments, nMinComments, nMaxComments)
    });
  }
  return res;
};

var setElementPictureData = function (pictureData, pictureElement, imageSelector, likesSelector, commentSelector) {
  pictureElement.querySelector(imageSelector).src = pictureData.url;
  pictureElement.querySelector(likesSelector).textContent = pictureData.likes;
  pictureElement.querySelector(commentSelector).textContent = pictureData.comments.length;
};

var createPictureFromTemplate = function (pictureData, pictureTemplate) {
  var pictureElement = pictureTemplate.cloneNode(true);
  setElementPictureData(pictureData, pictureElement, OVERLAY_IMAGE_SELECTOR, '.picture-likes', '.picture-comments');
  return pictureElement;
};

var onGalleryOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideGalleryOverlay();
  }
};

var onGalleryOverlayCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hideGalleryOverlay();
  }
};

var showGalleryOverlay = function (picture) {
  setElementPictureData(picture, galleryOverlay, '.gallery-overlay-image', '.likes-count', '.comments-count');
  document.addEventListener('keydown', onGalleryOverlayEscPress);
  galleryOverlayClose.addEventListener('keydown', onGalleryOverlayCloseEnterPress);
  galleryOverlayClose.addEventListener('click', hideGalleryOverlay);
  galleryOverlay.classList.remove('hidden');
};

var showGalleryOverlayByUrl = function (pictureUrl) {
  var pictureData = pictures.find(function (picture) {
    return picture.url === pictureUrl;
  });
  showGalleryOverlay(pictureData);
};

var hideGalleryOverlay = function () {
  document.removeEventListener('keydown', onGalleryOverlayEscPress);
  galleryOverlayClose.removeEventListener('keydown', onGalleryOverlayCloseEnterPress);
  galleryOverlayClose.removeEventListener('click', hideGalleryOverlay);
  galleryOverlay.classList.add('hidden');
};

var drawPictures = function (pictures) {
  var picturesBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    var pictureElement = createPictureFromTemplate(pictures[i], pictureTemplate);
    fragment.appendChild(pictureElement);
  }

  picturesBlock.appendChild(fragment);
};

var addEvents = function () {
  var pictureElements = document.querySelectorAll('.picture');

  for (var k = 0; k < pictureElements.length; k++) {
    pictureElements[k].addEventListener('click', function (evt) {
      showGalleryOverlayByUrl(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'));
      evt.preventDefault();
    });

    pictureElements[k].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        showGalleryOverlayByUrl(evt.currentTarget.querySelector(OVERLAY_IMAGE_SELECTOR).getAttribute('src'));
        evt.preventDefault();
      }
    });
  };
};

document.querySelector('.upload-overlay').classList.add('hidden');

var pictures = generatePictureData(PICTURES_NUMBER, LIKES_MIN, LIKES_MAX, COMMENTS, COMMENTS_MIN, COMMENTS_MAX);
drawPictures(pictures);
addEvents();

