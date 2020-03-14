'use strict';

(function () {
  // в неактивном режиме все поля формы заблокированы

  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;

  for (var j = 0; j < adFormFields.length; j++) {
    adFormFields[j].setAttribute('disabled', 'true');
  }

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

  window.form = {
    checkCapacityValidity: checkCapacityValidity,
  };
})();
