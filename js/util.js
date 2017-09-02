'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var generateRandomIntegerFromRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    generateRandomIntegerFromRange: generateRandomIntegerFromRange,

    generateIndexesPermutation: function (nElements) {
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
    },

    callIfEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    callIfEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };

})();
