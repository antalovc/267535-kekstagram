'use strict';

(function () {
  var SORT_FUNCTIONS = {

    'filter-recommend': function (data) {
      return data;
    },

    'filter-popular': function (data) {
      return data.sort(function (left, right) {
        var res = 0;
        if (left.likes > right.likes) {
          res = -1;
        } else if (left.likes < right.likes) {
          res = 1;
        }
        return res;
      });
    },

    'filter-discussed': function (data) {
      return data.sort(function (left, right) {
        var res = 0;
        if (left.comments.length > right.comments.length) {
          res = -1;
        } else if (left.comments.length < right.comments.length) {
          res = 1;
        }
        return res;
      });
    },

    'filter-random': function (data) {
      return window.util.getNRandomArrayItems(data, data.length);
    }
  };

  var filtersList = document.querySelector('.filters');
  var currentFilter = null;

  var updateGallery = function () {
    window.gallery.drawGallery(SORT_FUNCTIONS[currentFilter]);
  };

  filtersList.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      currentFilter = evt.target.id;
      window.debounce(updateGallery);
    }
  });

})();
