'use strict';

window.initializeFilters = (function () {

  var FILTER_ELEMENT_NAME = 'effect';

  return function (element, callback) {

    element.addEventListener('click', function (evt) {
      if (evt.target.getAttribute('name') === FILTER_ELEMENT_NAME) {
        callback(evt.target.getAttribute('id'));
      }
    });

  };
})();
