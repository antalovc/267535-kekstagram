'use strict';

window.form = (function () {

  var NONE_FILTER_ID = 'upload-effect-none';
  var currentFilterId = NONE_FILTER_ID;

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadInput = uploadForm.querySelector('#upload-file');
  var framingOverlay = uploadForm.querySelector('.upload-overlay'); // форма кадрирования
  var framingOverlayCancel = framingOverlay.querySelector('.upload-form-cancel');
  var framingOverlayComment = framingOverlay.querySelector('.upload-form-description');
  var framingOverlayHashtag = framingOverlay.querySelector('.upload-form-hashtags');
  var framingOverlayPreview = framingOverlay.querySelector('.effect-image-preview');

  var framingOverlayControls = framingOverlay.querySelector('.upload-effect-controls');
  var framingOverlayLevel = framingOverlayControls.querySelector('.upload-effect-level');

  // first: hide the form

  framingOverlay.classList.add('hidden');

  // second: add interactivity - set scaling handling

  var framingOverlayScaleControls = framingOverlay.querySelector('.upload-resize-controls');
  var framingOverlayScaleValue = framingOverlayScaleControls.querySelector('.upload-resize-controls-value');

  var adjustScale = function (element, valueElement, scale) {
    valueElement.value = scale + '%';
    framingOverlayPreview.style.transform = 'scale(' + scale / 100 + ')';
  };

  window.initializeScale(framingOverlayScaleControls, framingOverlayScaleValue, adjustScale);

  // second: add interactivity - add validation handling

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

  framingOverlayComment.addEventListener('invalid', onInputInvalid);
  framingOverlayHashtag.addEventListener('invalid', onInputInvalid);
  framingOverlayHashtag.addEventListener('change', function () {
    framingOverlayHashtag.setCustomValidity(checkHashTagValidity());
  });

  // second: add interactivity - add filters handling (changing filters)

  var framingOverlayLevelLine = framingOverlayLevel.querySelector('.upload-effect-level-line');
  var framingOverlayLevelPin = framingOverlayLevel.querySelector('.upload-effect-level-pin');
  var framingOverlayLevelVal = framingOverlayLevel.querySelector('.upload-effect-level-val');

  var applyFilter = function (newFilterId) {
    framingOverlayPreview.classList.remove(currentFilterId.substring('upload-'.length));
    currentFilterId = newFilterId;
    framingOverlayPreview.classList.add(currentFilterId.substring('upload-'.length));
    resetFilterLevel();
  };

  window.initializeFilters(framingOverlayControls, applyFilter);

  // second: add interactivity - add filters handling (adjusting filters)

  var effectLevelSize = 0;
  var effectLevelWidth = 0;
  var effectLevelLeft = 0;
  var FILTER_SCALES = {
    'upload-effect-chrome': {
      param: 'grayscale',
      max: 1,
      units: ''
    },
    'upload-effect-sepia': {
      param: 'sepia',
      max: 1,
      units: ''
    },
    'upload-effect-marvin': {
      param: 'invert',
      max: 100,
      units: '%'
    },
    'upload-effect-phobos': {
      param: 'blur',
      max: 3,
      units: 'px'
    },
    'upload-effect-heat': {
      param: 'brightness',
      max: 1,
      units: ''
    }
  };

  var setFilterLevelByValue = function (value) {
    if (value < 0 || value > 1) {
      return;
    }

    var valuePercent = Math.round(value * 100) + '%';
    framingOverlayLevelPin.style.left = valuePercent;
    framingOverlayLevelVal.style.width = valuePercent;

    var filterScale = null;
    if (currentFilterId !== NONE_FILTER_ID) {
      filterScale = FILTER_SCALES[currentFilterId];
      framingOverlayPreview.style.setProperty('filter', filterScale.param + '(' + (value * filterScale.max).toFixed(2) + filterScale.units + ')');
    } else {
      framingOverlayPreview.style.removeProperty('filter');
    }
  };

  var setFilterLevelByPosition = function (x, refreshFilterLevelSizes) {
    if (refreshFilterLevelSizes) {
      effectLevelSize = framingOverlayLevelLine.getBoundingClientRect();
      effectLevelWidth = effectLevelSize.width;
      effectLevelLeft = effectLevelSize.left;
    }

    var newLevelVal = 0;
    if (x <= effectLevelLeft) {
      newLevelVal = 0;
    } else if (x >= effectLevelWidth + effectLevelLeft) {
      newLevelVal = 1;
    } else {
      newLevelVal = ((x - effectLevelLeft) / effectLevelWidth);
    }

    setFilterLevelByValue(newLevelVal);
  };

  var resetFilterLevel = function () {
    framingOverlayLevel.classList.toggle('hidden', currentFilterId === NONE_FILTER_ID);
    framingOverlayLevelPin.style.removeProperty('left');
    framingOverlayLevelVal.style.removeProperty('width');

    var pinRect = framingOverlayLevelPin.getBoundingClientRect();
    setFilterLevelByPosition(pinRect.left + pinRect.width / 2, true);
  };

  framingOverlayLevel.addEventListener('mousedown', function (evt) {
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
    evt.preventDefault();
    if (uploadForm.checkValidity()) {
      uploadForm.submit();
      resetFramingOverlay();
    }
  });

  // pre-last: add listeners to show/hide the form

  var onFramingOverlayCancelEscPress = function (evt) {
    window.util.callIfEnterEvent(evt, hideFramingOverlay);
  };

  var onFramingOverlayEscPress = function (evt) {
    if (document.activeElement !== framingOverlayComment) {
      window.util.callIfEscEvent(evt, hideFramingOverlay);
    }
  };

  var resetFramingOverlay = function () {
    framingOverlayScaleValue.value = '100%';
    framingOverlayPreview.style.transform = 'scale(1.00)';

    framingOverlayComment.value = '';
    framingOverlayHashtag.value = '';

    framingOverlayControls.querySelector('#' + NONE_FILTER_ID).click();

    uploadInput.value = '';
  };

  var showFramingOverlay = function () {
    document.addEventListener('keydown', onFramingOverlayEscPress);
    framingOverlay.classList.remove('hidden');
  };

  var hideFramingOverlay = function () {
    document.removeEventListener('keydown', onFramingOverlayEscPress);
    resetFramingOverlay();
    framingOverlay.classList.add('hidden');
  };

  framingOverlayCancel.addEventListener('keydown', onFramingOverlayCancelEscPress);
  framingOverlayCancel.addEventListener('click', hideFramingOverlay);

  // last: add listener to show the form

  uploadInput.addEventListener('change', function () {
    if (uploadInput.value) {
      showFramingOverlay();
    }
  });

})();
