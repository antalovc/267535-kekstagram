'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

    getNRandomArrayItems: function (array, n) {
      var permutation = generateIndexesPermutation(array.length);
      var res = [];
      while (n > 0) {
        res.push(array[permutation[n - 1] - 1]);
        n--;
      }
      return res;
    },

    addTextInputValidityCheck: function (element, customCheckFunction) {
      element.addEventListener('input', function () {
        var isValid = false;
        if (typeof customCheckFunction === 'function') {
          var validityMessage = customCheckFunction(element);
          element.setCustomValidity(validityMessage);
          isValid = validityMessage.length === 0;
        } else {
          isValid = element.checkValidity();
        }
        element.style.borderColor = isValid ? 'initial' : 'red';
      });
    }
  };

})();
