'use strict';

window.form = (function () {

  // constants

  var NONE_FILTER_ID = 'upload-effect-none';

  var MAX_HASTAGS_NUMBER = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var HASHTAG_SEPARATOR = ' ';

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

  var currentFilterId = NONE_FILTER_ID;

  var uploadFormElement = document.querySelector('#upload-select-image');
  var uploadInputElement = uploadFormElement.querySelector('#upload-file');

  var overlayElement = uploadFormElement.querySelector('.upload-overlay');
  var overlayPreviewElement = overlayElement.querySelector('.effect-image-preview');
  var overlayControlsElement = overlayElement.querySelector('.upload-effect-controls');

  // first: hide the form

  overlayElement.classList.add('hidden');

  // second: add interactivity - set scaling handling

  var overlayScaleElements = overlayElement.querySelector('.upload-resize-controls');
  var overlayScaleValueElement = overlayScaleElements.querySelector('.upload-resize-controls-value');

  var adjustScale = function (element, valueElement, scale) {
    valueElement.value = scale + '%';
    overlayPreviewElement.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(overlayScaleElements, overlayScaleValueElement, adjustScale);

  // second: add interactivity - add validation handling

  var overlayCommentElement = overlayElement.querySelector('.upload-form-description');
  var overlayHashTagElement = overlayElement.querySelector('.upload-form-hashtags');

  var checkHashTagValidity = function (input) {
    var value = input.value;
    var hashTags = [];
    var splitLength = 0;
    var hashTagsLength = 0;

    if (value !== '') {
      hashTags = value.split(HASHTAG_SEPARATOR);
      splitLength = hashTags.length;

      for (var i = 0; i < splitLength; i++) {
        if (hashTags[i]) {

          hashTagsLength++;

          if (hashTags[i].indexOf('#') !== 0 || hashTags[i].lastIndexOf('#') !== 0) {
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

  window.util.addTextInputValidityCheck(overlayCommentElement);
  window.util.addTextInputValidityCheck(overlayHashTagElement, checkHashTagValidity);

  // second: add interactivity - add filters handling (changing filters)

  var overlayLevelElement = overlayControlsElement.querySelector('.upload-effect-level');
  var overlayLevelLineElement = overlayLevelElement.querySelector('.upload-effect-level-line');
  var overlayLevelPinElement = overlayLevelElement.querySelector('.upload-effect-level-pin');
  var overlayLevelValElement = overlayLevelElement.querySelector('.upload-effect-level-val');
  var defaultLevelPercent = null;

  var applyFilter = function (newFilterId) {
    overlayPreviewElement.classList.remove(currentFilterId.substring('upload-'.length));
    currentFilterId = newFilterId;
    overlayPreviewElement.classList.add(currentFilterId.substring('upload-'.length));
    resetFilterLevel();
  };

  window.initializeFilters(overlayControlsElement, applyFilter);

  // second: add interactivity - add filters handling (adjusting filters)

  var effectLevelSize = 0;
  var effectLevelWidth = 0;
  var effectLevelLeft = 0;

  var setFilterLevelByValue = function (percent) {
    if (percent < 0 || percent > 100) {
      return;
    }
    percent = Math.round(percent);

    var valuePercent = percent + '%';
    overlayLevelPinElement.style.left = valuePercent;
    overlayLevelValElement.style.width = valuePercent;

    if (currentFilterId !== NONE_FILTER_ID) {
      overlayPreviewElement.style.setProperty('filter', FILTER_SCALES[currentFilterId](percent), '');
    } else {
      overlayPreviewElement.style.removeProperty('filter');
    }
  };

  var convertFilterPositionToPercent = function (position, refreshFilterLevelSizes) {
    if (refreshFilterLevelSizes) {
      effectLevelSize = overlayLevelLineElement.getBoundingClientRect();
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
    overlayLevelElement.classList.toggle('hidden', currentFilterId === NONE_FILTER_ID);
    overlayLevelPinElement.style.removeProperty('left');
    overlayLevelValElement.style.removeProperty('width');

    if (defaultLevelPercent === null) {
      var filterPinRect = overlayLevelPinElement.getBoundingClientRect();
      defaultLevelPercent = convertFilterPositionToPercent(filterPinRect.left + filterPinRect.width / 2, true);
    }
    setFilterLevelByValue(defaultLevelPercent, true);
  };

  overlayLevelElement.addEventListener('mousedown', function (evt) {
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

  uploadFormElement.addEventListener('submit', function (evt) {
    if (uploadFormElement.checkValidity()) {
      window.backend.save(new FormData(uploadFormElement), function () {
        window.errorMessage.hide();
        hideFramingOverlay();
      }, window.errorMessage.show);
    }
    evt.preventDefault();
  });

  // pre-last: add listeners to show/hide the form

  var overlayCancelElement = overlayElement.querySelector('.upload-form-cancel');

  var onFramingOverlayCancelEscPress = function (evt) {
    window.util.callIfEnterEvent(evt, hideFramingOverlay);
  };

  var onFramingOverlayEscPress = function (evt) {
    if (document.activeElement !== overlayCommentElement) {
      window.util.callIfEscEvent(evt, hideFramingOverlay);
    }
  };

  var resetFramingOverlay = function () {
    overlayScaleValueElement.value = '100%';
    overlayPreviewElement.style.transform = 'scale(1.00)';

    overlayCommentElement.value = '';
    overlayCommentElement.style.borderColor = 'initial';
    overlayHashTagElement.value = '';
    overlayHashTagElement.style.borderColor = 'initial';

    overlayControlsElement.querySelector('#' + NONE_FILTER_ID).click();

    uploadInputElement.value = '';
  };

  var showFramingOverlay = function (picture) {
    overlayPreviewElement.src = picture;
    document.addEventListener('keydown', onFramingOverlayEscPress);
    overlayElement.classList.remove('hidden');
  };

  var hideFramingOverlay = function () {
    document.removeEventListener('keydown', onFramingOverlayEscPress);
    resetFramingOverlay();
    overlayElement.classList.add('hidden');
  };

  overlayCancelElement.addEventListener('keydown', onFramingOverlayCancelEscPress);
  overlayCancelElement.addEventListener('click', hideFramingOverlay);

  // last: add listener to show the form

  window.pictureLoader(uploadInputElement, uploadFormElement.querySelector('.upload-image'), showFramingOverlay);

})();
