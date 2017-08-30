'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    }
  };

})();
