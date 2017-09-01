'use strict';

window.initializeScale = (function () {

  return function (element, scaleFunction) {

    var currentScale = 1;

    element.addEventListener('input', function (evt) {
      currentScale = evt.value;
      scaleFunction(currentScale);
    });

  };
})();
