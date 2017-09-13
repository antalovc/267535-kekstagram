'use strict';

window.pictureLoader = (function () {

  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var reader = new FileReader();

  var handleInput = function (file, callback) {
    var fileName = file.name.toLowerCase();

    if (FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    })) {
      reader.addEventListener('load', function () {
        callback(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  return (function (fileInput, dragInput, callback) {

    fileInput.addEventListener('change', function () {
      if (fileInput.value) {
        handleInput(fileInput.files[0], callback)
      }
    });

    window.addEventListener("drop", function (evt) {
      handleInput(evt.dataTransfer.files[0], callback)
      evt.preventDefault();
    }, false);

    window.addEventListener("dragover", function (evt) {
      evt.preventDefault();
    }, false);


  });

})();
