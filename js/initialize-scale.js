'use strict';

window.initializeScale = (function () {

  return function (element, valueElement, callback) {
    var currentScale = 1;
    var step = +element.getAttribute('step');
    var min = +element.getAttribute('min');
    var max = +element.getAttribute('max');

    element.addEventListener('click', function (evt) {
      currentScale = parseInt(valueElement.value, 10);

      if (evt.target.textContent[0] === '+') {
        currentScale += step;
      } else if (evt.target.textContent[0] === '–') {
        currentScale -= step;
      }

      currentScale = (currentScale > max) ? max : currentScale;
      currentScale = (currentScale < min) ? min : currentScale;

      callback(element, valueElement, currentScale);
    });

  };
})();
