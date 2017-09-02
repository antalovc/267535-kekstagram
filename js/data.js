'use strict';

window.picturesData = (function () {

  var PICTURES_NUMBER = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;
  var COMMENTS_MIN = 1;
  var COMMENTS_MAX = 2;
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var generatePictureComments = function (possibleComments, nMinComments, nMaxComments) {
    var nComments = window.util.generateRandomIntegerFromRange(nMinComments, nMaxComments);
    var comments = [];
    var commentsIndexes = [];
    var newCommentIndex = 0;

    while (commentsIndexes.length < nComments) {
      newCommentIndex = window.util.generateRandomIntegerFromRange(0, possibleComments.length - 1);
      if (commentsIndexes.indexOf(newCommentIndex) === -1) {
        commentsIndexes.push(newCommentIndex);
      }
    }

    for (var i = 0; i < nComments; i++) {
      comments.push(possibleComments[commentsIndexes[i]]);
    }
    return comments;
  };

  var generatePictureData = function () {
    var res = [];

    var indexesPermutation = window.util.generateIndexesPermutation(PICTURES_NUMBER);
    for (var i = 0; i < PICTURES_NUMBER; i++) {
      res.push({
        url: 'photos/' + indexesPermutation[i] + '.jpg',
        likes: window.util.generateRandomIntegerFromRange(LIKES_MIN, LIKES_MAX),
        comments: generatePictureComments(COMMENTS, COMMENTS_MIN, COMMENTS_MAX)
      });
    }
    return res;
  };

  return generatePictureData();

})();
