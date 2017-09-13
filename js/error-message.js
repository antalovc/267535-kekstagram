'use strict';

window.errorMessage = (function () {
  var errorMessageDiv = document.createElement('div');
  errorMessageDiv.classList.add('message-error');
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
