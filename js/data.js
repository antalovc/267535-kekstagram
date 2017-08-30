'use strict';

window.picturesData = (function () {

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

  var generatePictureData = function () {
    var res = [];

    var indexesPermutation = generateIndexesPermutation(PICTURES_NUMBER);
    for (var i = 0; i < PICTURES_NUMBER; i++) {
      res.push({
        url: 'photos/' + indexesPermutation[i] + '.jpg',
        likes: generateRandomIntegerFromRange(LIKES_MIN, LIKES_MAX),
        comments: generatePictureComments(COMMENTS, COMMENTS_MIN, COMMENTS_MAX)
      });
    }
    return res;
  };

  return generatePictureData();

})();
