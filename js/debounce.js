'use strict';

window.debounce = (function () {

  var DEBOUNCE_INTERVAL = 0.5; // sec

  var lastTimeout;

  return (function (fun) {

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL * 1000);

  });

})();
