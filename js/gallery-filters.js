'use strict';

(function () {
  var SWITCHING_ELEMENT_TYPE = 'radio';

  var SORT_FUNCTIONS = {

    'filter-recommend': function (data) {
      return data;
    },

    'filter-popular': function (data) {
      return data.sort(function (left, right) {
        return right.likes - left.likes;
      });
    },

    'filter-discussed': function (data) {
      return data.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    },

    'filter-random': function (data) {
      return window.util.getNRandomArrayItems(data, data.length);
    }
  };

  var filterListElement = document.querySelector('.filters');
  var currentFilter = null;

  var update = function () {
    window.gallery.draw(SORT_FUNCTIONS[currentFilter]);
  };

  filterListElement.addEventListener('click', function (evt) {
    if (evt.target.type === SWITCHING_ELEMENT_TYPE) {
      currentFilter = evt.target.id;
      window.debounce(update);
    }
  });

})();
