'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  // в неактивном режиме все поля формы заблокированы

  var adForm = document.querySelector('.ad-form');
  var adFormFields = Array.from(adForm.children);

  var disableFormFields = function () {
    adFormFields.forEach(function (field) {
      field.setAttribute('disabled', 'true');
    });
  };

  disableFormFields();

  // проверка на соответствие числа комнат числу гостей

  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var checkCapacityValidity = function () {
    var adFormRoomNumberValue = Number(adFormRoomNumber.value);
    var adFormCapacityValue = Number(adFormCapacity.value);

    if (adFormRoomNumberValue < adFormCapacityValue && adFormRoomNumberValue !== 100) {
      adFormCapacity.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (adFormRoomNumberValue === 100 && adFormCapacityValue !== 0) {
      adFormCapacity.setCustomValidity('100-комнатные квартиры — не для гостей');
    } else {
      adFormCapacity.setCustomValidity('');
    }
  };

  adFormRoomNumber.addEventListener('change', function () {
    checkCapacityValidity();
  });

  adFormCapacity.addEventListener('change', function () {
    checkCapacityValidity();
  });

  // синхронизация времени заезда и времени выезда

  var checkinTime = adForm.querySelector('#timein');
  var checkoutTime = adForm.querySelector('#timeout');

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });

  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  // соответствие минимальной цены типу жилья

  var housingType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');

  var housingTypeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  housingType.addEventListener('change', function () {
    price.placeholder = housingTypeToPrice[housingType.value];
    price.min = housingTypeToPrice[housingType.value];
  });

  // отправка формы

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload.sendData(new FormData(adForm), window.upload.uploadSuccessful, window.upload.uploadError);
  });

  // сброс полей формы

  var adFormReset = adForm.querySelector('.ad-form__reset');

  var onClickReset = function (evt) {
    evt.preventDefault();
    window.activation.deactivateWindow();
  };

  var onKeydownReset = function (evt) {
    evt.preventDefault();
    if (evt.key === ENTER_KEY) {
      window.activation.deactivateWindow();
    }
  };

  adFormReset.addEventListener('click', onClickReset);

  window.form = {
    checkCapacityValidity: checkCapacityValidity,
    disableFormFields: disableFormFields
  };
})();
