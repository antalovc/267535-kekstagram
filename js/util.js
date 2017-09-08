'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errorMessageDiv = null;

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

  return {
    callIfEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    callIfEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    showErrorMessage: function (errorMessage) {
      if (!errorMessageDiv) {
        errorMessageDiv = document.createElement('div');
        errorMessageDiv.style = 'z-index: 100; margin: 0px auto; text-align: center; background-color: red; padding: 15px 10px; border: 1px solid;';
        errorMessageDiv.style.position = 'fixed';
        errorMessageDiv.style.left = 0;
        errorMessageDiv.style.right = 0;
        errorMessageDiv.style.bottom = 0;
        errorMessageDiv.style.width = '582px';
        errorMessageDiv.style.fontSize = '14px';
        errorMessageDiv.style.fontFamily = 'Open Sans';
        errorMessageDiv.style.color = '#cc0000';
        errorMessageDiv.style.backgroundColor = '#f99fbc';

        errorMessageDiv.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', errorMessageDiv);
      } else {
        errorMessageDiv.textContent = errorMessage;
        errorMessageDiv.classList.remove('hidden');
      }
    },

    hideErrorMessage: function () {
      errorMessageDiv.classList.add('hidden');
    },

    getNRandomArrayItems: function (array, n) {
      var permutation = generateIndexesPermutation(array.length);
      var res = [];
      while (n > 0) {
        res.push(array[permutation[n - 1] - 1]);
        n--;
      }
      return res;
    },
  };

})();
