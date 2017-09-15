'use strict';

(function () {
  var SWITCHING_ELEMENT_TYPE = 'radio';

  var FILTER_NAME_RECOMMENDED = 'filter-recommend';
  var FILTER_NAME_POPULAR = 'filter-popular';
  var FILTER_NAME_DISCUSSED = 'filter-discussed';
  var FILTER_NAME_RANDOM = 'filter-random';

  var sortFunctions = {};

  sortFunctions[FILTER_NAME_RECOMMENDED] = function (data) {
    return data;
  };
  sortFunctions[FILTER_NAME_POPULAR] = function (data) {
    return data.sort(function (left, right) {
      return right.likes - left.likes;
    });
  };
  sortFunctions[FILTER_NAME_DISCUSSED] = function (data) {
    return data.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };
  sortFunctions[FILTER_NAME_RANDOM] = function (data) {
    return window.util.getNRandomArrayItems(data, data.length);
  };

  var filterListElement = document.querySelector('.filters');
  var currentFilter = null;

  var update = function () {
    window.gallery.draw(sortFunctions[currentFilter]);
  };

  filterListElement.addEventListener('click', function (evt) {
    if (evt.target.type === SWITCHING_ELEMENT_TYPE) {
      currentFilter = evt.target.id;
      window.debounce(update);
    }
  });

})();
