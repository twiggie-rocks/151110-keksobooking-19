'use strict';

// тестовые данные

var titles = ['Царские апартаменты', 'Дом с видом на реку', 'Хижина отшельника', 'Пентхаус с видом на море'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var descriptions = ['Это лучшее жилье, которое вы видели в своей жизни', 'Скромная квартира для бюджетных путешественников', 'Идеальный вариант в центре города', 'Дом в шаговой доступности от аэропорта'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// функции для генерации случайных данных

var generateRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
};

var generateRandomString = function (arr) {
  var firstString = 0;
  var lastString = arr.length - 1;
  var randomString = generateRandomNumber(firstString, lastString);

  return arr[randomString];
};

var generateRandomArray = function (arr) {
  var arrMin = 1;
  var arrMax = arr.length - 1;
  var randomArrayLength = generateRandomNumber(arrMin, arrMax);
  var randomArray = [];

  for (var i = 0; i < randomArrayLength; i++) {
    randomArray.push(arr[i]);
  }

  return randomArray;
};

// создать массив с объектами

var generateSimilarOffers = function () {
  var offers = [];
  for (var i = 0; i < 8; i++) {
    var similarOffer = {
      author: {
        avatar: 'img/avatars/user0' + generateRandomNumber(1, 8) + '.png'
      },
      offer: {
        title: generateRandomString(titles),
        address: generateRandomNumber(0, 750).toString() + ', ' + generateRandomNumber(130, 630).toString(),
        price: generateRandomNumber(100, 20000),
        type: generateRandomString(types),
        rooms: generateRandomNumber(1, 5),
        guests: generateRandomNumber(1, 10),
        checkin: generateRandomString(times),
        checkout: generateRandomString(times),
        features: generateRandomArray(features),
        description: generateRandomString(descriptions),
        photos: generateRandomArray(photos)
      },
      location: {
        x: generateRandomNumber(25, 1200),
        y: generateRandomNumber(130, 630)
      }
    };
    offers.push(similarOffer);
  }

  return offers;
};

var similarOffers = generateSimilarOffers();

// создать DOM-элементы для меток на карте

var pinTemplate = document.querySelector('#pin').content;
var newPinTemplate = pinTemplate.querySelector('.map__pin');

var pinX = 25;
var pinY = 70;

var createPin = function (newOffer) {
  var newPin = newPinTemplate.cloneNode(true);
  var pinAvatar = newPin.querySelector('img');

  newPin.style.left = (newOffer.location.x - pinX) + 'px';
  newPin.style.top = (newOffer.location.y - pinY) + 'px';
  pinAvatar.src = newOffer.author.avatar;
  pinAvatar.alt = newOffer.offer.title;

  return newPin;
};

// отрисовать пины

var fragment = document.createDocumentFragment();
var mapPins = document.querySelector('.map__pins');

for (var i = 0; i < similarOffers.length; i++) {
  fragment.appendChild(createPin(similarOffers[i]));
}

mapPins.appendChild(fragment);

// в неактивном режиме все поля формы заблокированы

var adForm = document.querySelector('.ad-form');
var adFormFields = adForm.children;

for (var j = 0; j < adFormFields.length; j++) {
  adFormFields[j].setAttribute('disabled', 'true');
}

// в неактивном состоянии в поле адреса подставляются координаты центра метки

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var MAIN_PIN_ACTIVE_HEIGHT = 87;

var MAIN_PIN_X = 570;
var MAIN_PIN_Y = 375;

var mainPinXCoordinate = Math.round(MAIN_PIN_X + MAIN_PIN_WIDTH / 2);
var mainPinYCoordinate = Math.round(MAIN_PIN_Y + MAIN_PIN_HEIGHT / 2);

var addressField = adForm.querySelector('#address');

var setAddress = function () {
  addressField.value = mainPinXCoordinate + ', ' + mainPinYCoordinate;
};

setAddress();

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

// перевод страницы в активное состояние

var mainPin = mapPins.querySelector('.map__pin--main');

var activateWindow = function () {
  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  for (var k = 0; k < adFormFields.length; k++) {
    adFormFields[k].removeAttribute('disabled');
  }

  mainPinYCoordinate = MAIN_PIN_Y + MAIN_PIN_ACTIVE_HEIGHT;
  setAddress();

  checkCapacityValidity();
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
