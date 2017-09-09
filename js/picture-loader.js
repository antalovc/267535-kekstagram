'use strict';

window.pictureLoader = (function () {

  var FILE_TYPES = ['gif', 'png', 'jpg', 'jpeg'];

  var reader = new FileReader();

  return (function (fileInput, callback) {

    fileInput.addEventListener('change', function () {

      if (fileInput.value) {
        var file = fileInput.files[0];
        var fileName = file.name.toLowerCase();

        if (FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        })) {
          reader.addEventListener('load', function () {
            callback(reader.result);
          });
          reader.readAsDataURL(file);
        }
      }

    });

  });

})();
