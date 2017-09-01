'use strict';

window.initializeFilters = (function () {

  return function (element, filterChangeFunction) {

    element.addEventListener('click', function (evt) {
      filterChangeFunction(evt);
    });

  };
})();
