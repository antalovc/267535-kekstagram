'use strict';

window.errorMessage = (function () {
  var errorMessageElement = document.createElement('div');
  errorMessageElement.classList.add('message-error');
  errorMessageElement.classList.add('hidden');
  document.body.insertAdjacentElement('afterbegin', errorMessageElement);

  return ({

    show: function (errorMessage) {
      errorMessageElement.textContent = errorMessage;
      errorMessageElement.classList.remove('hidden');
    },

    hide: function () {
      errorMessageElement.classList.add('hidden');
    }

  });
})();
