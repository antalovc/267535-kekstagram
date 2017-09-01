'use strict';

window.initializeFilters = (function () {

  return function (element, filterChangeFunction) {

    element.addEventListener('click', function (evt) {
      if (evt.target.getAttribute('name') === 'effect') {
        filterChangeFunction(evt.target.getAttribute('id'));
      }
    });

  };
})();
