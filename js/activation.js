'use strict';

(function () {
  // перевод страницы в активное состояние

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFields = Array.from(adForm.children);

  var activateWindow = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    adFormFields.forEach(function (field) {
      field.removeAttribute('disabled');
    });

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

  // деактивация страницы

  var filter = document.querySelector('.map__filters');

  var deactivateWindow = function () {
    adForm.reset();
    filter.reset();
    window.card.hideCard();
    window.pins.removePins();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.disableFormFields();
    window.mainPin.setDefautCoordinates();
    window.mainPin.setAddress(window.mainPin.inactiveX, window.mainPin.inactiveY);
    mainPin.addEventListener('mousedown', onMouseDown);
    mainPin.addEventListener('keydown', onKeyDown);
  };

  window.activation = {
    deactivateWindow: deactivateWindow
  };
})();
