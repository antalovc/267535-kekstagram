'use strict';

window.initializeScale = (function () {

  return function (element, valueElement, scaleFunction) {
    var currentScale = parseInt(valueElement.value, 10);

    element.addEventListener('click', function (evt) {
      var step = +element.getAttribute('step');
      var min = +element.getAttribute('min');
      var max = +element.getAttribute('max');

      if (evt.target.textContent[0] === '+') {
        currentScale += step;
      } else if (evt.target.textContent[0] === '–') {
        currentScale -= step;
      }

      currentScale = (currentScale > max) ? max : currentScale;
      currentScale = (currentScale < min) ? min : currentScale;

      scaleFunction(element, valueElement, currentScale);
    });

  };
})();
