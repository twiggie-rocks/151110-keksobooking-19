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

var similarOffers = [];

var generateSimilarOffers = function () {
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
    similarOffers.push(similarOffer);
  }

  return similarOffers;
};

generateSimilarOffers();

// показать карту

document.querySelector('.map').classList.remove('map--faded');

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
