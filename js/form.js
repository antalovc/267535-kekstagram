'use strict';

window.form = (function () {

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadInput = uploadForm.querySelector('#upload-file');
  var framingOverlay = uploadForm.querySelector('.upload-overlay'); // форма кадрирования
  var framingOverlayCancel = framingOverlay.querySelector('.upload-form-cancel');
  var framingOverlayComment = framingOverlay.querySelector('.upload-form-description');
  var framingOverlayHashtag = framingOverlay.querySelector('.upload-form-hashtags');
  var framingOverlayScale = framingOverlay.querySelector('.upload-resize-controls-value');
  var framingOverlayPreview = framingOverlay.querySelector('.effect-image-preview');

  var onFramingOverlayCancelEscPress = function (evt) {
    window.util.callIfEnterEvent(evt, hideFramingOverlay);
  };

  var onFramingOverlayEscPress = function (evt) {
    if (document.activeElement !== framingOverlayComment) {
      window.util.callIfEscEvent(evt, hideFramingOverlay);
    }
  };

  var resetFramingOverlay = function () {
    framingOverlayScale.value = '100%';
    framingOverlayPreview.style.transform = 'scale(1.00)';

    framingOverlayComment.value = '';
    framingOverlayHashtag.value = '';

    uploadInput.value = '';
  };

  var showFramingOverlay = function () {
    document.addEventListener('keydown', onFramingOverlayEscPress);
    framingOverlay.classList.remove('hidden');
  };

  var hideFramingOverlay = function () {
    framingOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onFramingOverlayEscPress);
    resetFramingOverlay();
  };

  var changeFramingOverlayScale = function (increment) {
    var delta = 25;
    var value = parseInt(framingOverlayScale.value, 10);
    value = increment ? value + delta : value - delta;
    value = (value > 100) ? 100 : value;
    value = (value < 25) ? 25 : value;
    framingOverlayScale.value = value + '%';
    framingOverlayPreview.style.transform = 'scale(' + value / 100 + ')';
  };

  var incrementFramingOverlayScale = function () {
    changeFramingOverlayScale(true);
  };

  var decrementFramingOverlayScale = function () {
    changeFramingOverlayScale(false);
  };

  var onInputInvalid = function (evt) {
    var target = evt.target;
    target.style.borderColor = target.validity.valid ? 'initial' : 'red';
  };

  var checkHashTagValidity = function () {
    var value = framingOverlayHashtag.value;
    var hashTags = [];
    var splitLength = 0;
    var hashTagsLength = 0;
    var MAX_HASTAGS_NUMBER = 5;
    var MAX_HASHTAG_LENGTH = 20;

    if (value !== '') {
      hashTags = value.split(' ');
      splitLength = hashTags.length;

      for (var i = 0; i < splitLength; i++) {
        if (hashTags[i]) {

          hashTagsLength++;

          if (hashTags[i].indexOf('#') !== 0) {
            return 'Неверный формат хэштег(ов)';
          } else if (hashTags[i].length > MAX_HASHTAG_LENGTH + 1) {
            return 'Длина хэштега не должна превышать ' + MAX_HASHTAG_LENGTH + ' символов';
          }

          for (var j = 0; j < splitLength; j++) {
            if (hashTags[j] !== '' && hashTags[j] === hashTags[i] && i !== j) {
              return 'Хэштеги не могут дублироваться';
            }
          }

        }
      }

      if (!hashTagsLength) {
        return 'Неверный формат хэштег(ов)';
      } else if (hashTagsLength > MAX_HASTAGS_NUMBER) {
        return 'Количество хэштегов не должно превышать ' + MAX_HASTAGS_NUMBER;
      }
    }

    return '';
  };

  // first: hide the form

  framingOverlay.classList.add('hidden');

  // second: add event listeners to implement the workflow logic

  framingOverlayCancel.addEventListener('keydown', onFramingOverlayCancelEscPress);
  framingOverlayCancel.addEventListener('click', hideFramingOverlay);
  framingOverlay.querySelector('.upload-resize-controls-button-inc').addEventListener('click', incrementFramingOverlayScale);
  framingOverlay.querySelector('.upload-resize-controls-button-dec').addEventListener('click', decrementFramingOverlayScale);
  framingOverlayComment.addEventListener('invalid', onInputInvalid);
  framingOverlayHashtag.addEventListener('invalid', onInputInvalid);

  var currentFilter = '';
  uploadForm.querySelector('.upload-effect-controls').addEventListener('click', function (evt) {
    if (evt.target.getAttribute('type') === 'radio') {
      if (currentFilter) {
        framingOverlayPreview.classList.remove(currentFilter);
      }
      currentFilter = evt.target.getAttribute('id').substring('upload-'.length);
      framingOverlayPreview.classList.add(currentFilter);
    }
  });

  framingOverlayHashtag.addEventListener('change', function () {
    framingOverlayHashtag.setCustomValidity(checkHashTagValidity());
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (uploadForm.checkValidity()) {
      uploadForm.submit();
      resetFramingOverlay();
    }
  });

  // last: add listener to show the form

  uploadInput.addEventListener('change', function () {
    if (uploadInput.value) {
      showFramingOverlay();
    }
  });

})();
