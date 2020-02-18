'use strict';

(function () {
  // тестовые данные

  var titles = ['Царские апартаменты', 'Дом с видом на реку', 'Хижина отшельника', 'Пентхаус с видом на море'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var descriptions = ['Это лучшее жилье, которое вы видели в своей жизни', 'Скромная квартира для бюджетных путешественников', 'Идеальный вариант в центре города', 'Дом в шаговой доступности от аэропорта'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // создание массива случайных меток

  var generateSimilarOffers = function () {
    var offers = [];
    for (var i = 0; i < 8; i++) {
      var similarOffer = {
        author: {
          avatar: 'img/avatars/user0' + window.data.generateRandomNumber(1, 8) + '.png'
        },
        offer: {
          title: window.data.generateRandomString(titles),
          address: window.data.generateRandomNumber(0, 750).toString() + ', ' + window.data.generateRandomNumber(130, 630).toString(),
          price: window.data.generateRandomNumber(100, 20000),
          type: window.data.generateRandomString(types),
          rooms: window.data.generateRandomNumber(1, 5),
          guests: window.data.generateRandomNumber(1, 10),
          checkin: window.data.generateRandomString(times),
          checkout: window.data.generateRandomString(times),
          features: window.data.generateRandomArray(features),
          description: window.data.generateRandomString(descriptions),
          photos: window.data.generateRandomArray(photos)
        },
        location: {
          x: window.data.generateRandomNumber(25, 1200),
          y: window.data.generateRandomNumber(130, 630)
        }
      };
      offers.push(similarOffer);
    }

    return offers;
  };

  var similarOffers = generateSimilarOffers();

  // создание DOM-элементов для меток на карте

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

  // отрисовка пинов

  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');

  for (var i = 0; i < similarOffers.length; i++) {
    fragment.appendChild(createPin(similarOffers[i]));
  }

  mapPins.appendChild(fragment);
})();
