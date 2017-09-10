'use strict';

window.form = (function () {

  var NONE_FILTER_ID = 'upload-effect-none';
  var currentFilterId = NONE_FILTER_ID;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadInput = uploadForm.querySelector('#upload-file');

  var overlay = uploadForm.querySelector('.upload-overlay');
  var overlayPreview = overlay.querySelector('.effect-image-preview');
  var overlayControls = overlay.querySelector('.upload-effect-controls');

  // first: hide the form

  overlay.classList.add('hidden');

  // second: add interactivity - set scaling handling

  var overlayScaleControls = overlay.querySelector('.upload-resize-controls');
  var overlayScaleValue = overlayScaleControls.querySelector('.upload-resize-controls-value');

  var adjustScale = function (element, valueElement, scale) {
    valueElement.value = scale + '%';
    overlayPreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(overlayScaleControls, overlayScaleValue, adjustScale);

  // second: add interactivity - add validation handling

  var overlayComment = overlay.querySelector('.upload-form-description');
  var overlayHashTag = overlay.querySelector('.upload-form-hashtags');

  var checkHashTagValidity = function (hashTagInput) {
    var MAX_HASTAGS_NUMBER = 5;
    var MAX_HASHTAG_LENGTH = 20;

    var value = hashTagInput.value;
    var hashTags = [];
    var splitLength = 0;
    var hashTagsLength = 0;

    if (value !== '') {
      hashTags = value.split(' ');
      splitLength = hashTags.length;

      for (var i = 0; i < splitLength; i++) {
        if (hashTags[i]) {

          hashTagsLength++;

          if (hashTags[i].indexOf('#') !== 0) {
            return 'Неверный формат хэштег(ов)';
          } else if (hashTags[i].length === 1) {
            return 'Хэштег не может быть пустым';
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


  window.util.addTextInputValidityCheck(overlayComment);
  window.util.addTextInputValidityCheck(overlayHashTag, checkHashTagValidity);

  // second: add interactivity - add filters handling (changing filters)

  var overlayLevel = overlayControls.querySelector('.upload-effect-level');
  var overlayLevelLine = overlayLevel.querySelector('.upload-effect-level-line');
  var overlayLevelPin = overlayLevel.querySelector('.upload-effect-level-pin');
  var overlayLevelVal = overlayLevel.querySelector('.upload-effect-level-val');
  var defaultLevelPercent = null;

  var applyFilter = function (newFilterId) {
    overlayPreview.classList.remove(currentFilterId.substring('upload-'.length));
    currentFilterId = newFilterId;
    overlayPreview.classList.add(currentFilterId.substring('upload-'.length));
    resetFilterLevel();
  };

  window.initializeFilters(overlayControls, applyFilter);

  // second: add interactivity - add filters handling (adjusting filters)

  var effectLevelSize = 0;
  var effectLevelWidth = 0;
  var effectLevelLeft = 0;
  var FILTER_SCALES = {
    'upload-effect-chrome': function (percent) {
      return 'grayscale(' + percent * 0.01 + ')';
    },
    'upload-effect-sepia': function (percent) {
      return 'sepia(' + percent * 0.01 + ')';
    },
    'upload-effect-marvin': function (percent) {
      return 'invert(' + percent + '%)';
    },
    'upload-effect-phobos': function (percent) {
      return 'blur(' + percent * 0.03 + 'px)';
    },
    'upload-effect-heat': function (percent) {
      return 'brightness(' + percent * 0.03 + ')';
    }
  };

  var setFilterLevelByValue = function (percent) {
    if (percent < 0 || percent > 100) {
      return;
    }
    percent = Math.round(percent);

    var valuePercent = percent + '%';
    overlayLevelPin.style.left = valuePercent;
    overlayLevelVal.style.width = valuePercent;

    if (currentFilterId !== NONE_FILTER_ID) {
      overlayPreview.style.setProperty('filter', FILTER_SCALES[currentFilterId](percent), '');
    } else {
      overlayPreview.style.removeProperty('filter');
    }
  };

  var convertFilterPositionToPercent = function (position, refreshFilterLevelSizes) {
    if (refreshFilterLevelSizes) {
      effectLevelSize = overlayLevelLine.getBoundingClientRect();
      effectLevelWidth = effectLevelSize.width;
      effectLevelLeft = effectLevelSize.left;
    }

    var percent = 0;
    if (position >= effectLevelWidth + effectLevelLeft) {
      percent = 100;
    } else if (position > effectLevelLeft) {
      percent = (position - effectLevelLeft) * 100 / effectLevelWidth;
    }
    return percent;
  };

  var setFilterLevelByPosition = function (x, refreshFilterLevelSizes) {
    setFilterLevelByValue(convertFilterPositionToPercent(x, refreshFilterLevelSizes));
  };

  var resetFilterLevel = function () {
    overlayLevel.classList.toggle('hidden', currentFilterId === NONE_FILTER_ID);
    overlayLevelPin.style.removeProperty('left');
    overlayLevelVal.style.removeProperty('width');


    if (defaultLevelPercent === null) {
      var filterPinRect = overlayLevelPin.getBoundingClientRect();
      defaultLevelPercent = convertFilterPositionToPercent(filterPinRect.left + filterPinRect.width / 2, true);
    }
    setFilterLevelByValue(defaultLevelPercent, true);
  };

  overlayLevel.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    setFilterLevelByPosition(evt.x, true);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      setFilterLevelByPosition(moveEvt.x, false);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // third: add submit handling

  uploadForm.addEventListener('submit', function (evt) {
    if (uploadForm.checkValidity()) {
      window.backend.save(new FormData(uploadForm), function () {
        window.errorMessage.hide();
        hideFramingOverlay();
      }, window.errorMessage.show);
    }
    evt.preventDefault();
  });

  // pre-last: add listeners to show/hide the form

  var overlayCancel = overlay.querySelector('.upload-form-cancel');

  var onFramingOverlayCancelEscPress = function (evt) {
    window.util.callIfEnterEvent(evt, hideFramingOverlay);
  };

  var onFramingOverlayEscPress = function (evt) {
    if (document.activeElement !== overlayComment) {
      window.util.callIfEscEvent(evt, hideFramingOverlay);
    }
  };

  var resetFramingOverlay = function () {
    overlayScaleValue.value = '100%';
    overlayPreview.style.transform = 'scale(1.00)';

    overlayComment.value = '';
    overlayComment.style.borderColor = 'initial';
    overlayHashTag.value = '';
    overlayHashTag.style.borderColor = 'initial';

    overlayControls.querySelector('#' + NONE_FILTER_ID).click();

    uploadInput.value = '';
  };

  var showFramingOverlay = function (picture) {
    overlayPreview.src = picture;
    document.addEventListener('keydown', onFramingOverlayEscPress);
    overlay.classList.remove('hidden');
  };

  var hideFramingOverlay = function () {
    document.removeEventListener('keydown', onFramingOverlayEscPress);
    resetFramingOverlay();
    overlay.classList.add('hidden');
  };

  overlayCancel.addEventListener('keydown', onFramingOverlayCancelEscPress);
  overlayCancel.addEventListener('click', hideFramingOverlay);

  // last: add listener to show the form

  window.pictureLoader(uploadInput, showFramingOverlay);

})();
