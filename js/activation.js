'use strict';

(function () {
  // перевод страницы в активное состояние

  var MAIN_PIN_ACTIVE_HEIGHT = 87;
  var MAIN_PIN_ACTIVE_Y = 375;

  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;

  var activateWindow = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var k = 0; k < adFormFields.length; k++) {
      adFormFields[k].removeAttribute('disabled');
    }

    window.form.mainPinYCoordinate = MAIN_PIN_ACTIVE_Y + MAIN_PIN_ACTIVE_HEIGHT;
    window.form.setAddress();

    window.form.checkCapacityValidity();

    window.load.getData(window.filter.loadSuccessful);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activateWindow();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activateWindow();
    }
  });
})();
