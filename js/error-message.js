'use strict';

window.errorMessage = (function () {
  var errorMessageDiv = document.createElement('div');

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

  errorMessageDiv.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin', errorMessageDiv);

  return ({

    show: function (errorMessage) {
      errorMessageDiv.textContent = errorMessage;
      errorMessageDiv.classList.remove('hidden');
    },

    hide: function () {
      errorMessageDiv.classList.add('hidden');
    }

  });
})();
