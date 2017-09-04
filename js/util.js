'use strict';

window.util = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errorMessageDiv = null;

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
    }
  };

})();
