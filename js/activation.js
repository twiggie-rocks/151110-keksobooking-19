'use strict';

(function () {
  // перевод страницы в активное состояние

  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;

  var activateWindow = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var k = 0; k < adFormFields.length; k++) {
      adFormFields[k].removeAttribute('disabled');
    }

    window.mainPin.setAddress(window.mainPin.activeX, window.mainPin.activeY);

    window.form.checkCapacityValidity();

    window.load.getData(window.filter.loadSuccessful);

    mainPin.removeEventListener('mousedown', onMouseDown);
    mainPin.removeEventListener('keydown', onKeyDown);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      activateWindow();
    }
  };

  var onKeyDown = function (evt) {
    evt.preventDefault();

    if (evt.key === 'Enter') {
      activateWindow();
    }
  };

  mainPin.addEventListener('mousedown', onMouseDown);
  mainPin.addEventListener('keydown', onKeyDown);
})();
