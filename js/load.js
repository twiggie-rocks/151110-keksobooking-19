'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var getData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

  window.load = {
    getData: getData,
  };
})();
