'use strict';

window.initializeFilters = (function () {

  return function (element, callback) {

    element.addEventListener('click', function (evt) {
      if (evt.target.getAttribute('name') === 'effect') {
        callback(evt.target.getAttribute('id'));
      }
    });

  };
})();
