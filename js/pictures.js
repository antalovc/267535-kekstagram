'use strict';

var PICTURES_NUMBER = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 2;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

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
  setElementPictureData(pictureData, pictureElement, 'img', '.picture-likes', '.picture-comments');
  return pictureElement;
};

var drawPictures = function (pictures) {
  var picturesBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content;
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(createPictureFromTemplate(pictures[i], pictureTemplate));
  }
  picturesBlock.appendChild(fragment);
};

var pictures = generatePictureData(PICTURES_NUMBER, LIKES_MIN, LIKES_MAX, COMMENTS, COMMENTS_MIN, COMMENTS_MAX);
drawPictures(pictures);

document.querySelector('.upload-overlay').classList.add('hidden');

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');
setElementPictureData(pictures[0], galleryOverlay, '.gallery-overlay-image', '.likes-count', '.comments-count');


