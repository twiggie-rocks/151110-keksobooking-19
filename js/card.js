'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  // создание DOM-элемента карточки

  var cardTemplate = document.querySelector('#card').content;
  var newCardTemplate = cardTemplate.querySelector('.map__card');

  var createCard = function (currentOffer) {
    var newCard = newCardTemplate.cloneNode(true);

    var cardTitle = newCard.querySelector('.popup__title');
    cardTitle.textContent = currentOffer.offer.title;

    var cardAddress = newCard.querySelector('.popup__text--address');
    cardAddress.textContent = currentOffer.offer.address;

    var cardPrice = newCard.querySelector('.popup__text--price');
    cardPrice.textContent = currentOffer.offer.price + '₽/ночь';

    var cardType = newCard.querySelector('.popup__type');
    var housingTypeToText = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };
    cardType.textContent = housingTypeToText[currentOffer.offer.type];

    var cardCapacity = newCard.querySelector('.popup__text--capacity');
    if (currentOffer.offer.rooms === 0 || currentOffer.offer.guests === 0) {
      newCard.removeChild(cardCapacity);
    } else {
      cardCapacity.textContent = currentOffer.offer.rooms + ' комнаты для ' + currentOffer.offer.guests + ' гостей';
    }

    var cardTime = newCard.querySelector('.popup__text--time');
    cardTime.textContent = 'Заезд после ' + currentOffer.offer.checkin + ', выезд до ' + currentOffer.offer.checkout;

    var cardFeatures = newCard.querySelector('.popup__features');
    var featuresToClasses = {
      'wifi': '.popup__feature--wifi',
      'dishwasher': '.popup__feature--dishwasher',
      'parking': '.popup__feature--parking',
      'washer': '.popup__feature--washer',
      'elevator': '.popup__feature--elevator',
      'conditioner': '.popup__feature--conditioner'
    };
    for (var feature in featuresToClasses) {
      if (!currentOffer.offer.features.includes(feature)) {
        cardFeatures.removeChild(cardFeatures.querySelector(featuresToClasses[feature]));
      }
    }

    var cardDescription = newCard.querySelector('.popup__description');
    cardDescription.textContent = currentOffer.offer.description;

    var cardPhotos = newCard.querySelector('.popup__photos');
    var cardPhoto = cardPhotos.querySelector('.popup__photo');

    if (currentOffer.offer.photos.length === 0) {
      cardPhotos.removeChild(cardPhoto);
    } else {
      cardPhoto.src = currentOffer.offer.photos[0];

      for (var i = 1; i < currentOffer.offer.photos.length; i++) {
        var newCardPhoto = cardPhoto.cloneNode(true);
        newCardPhoto.src = currentOffer.offer.photos[i];
        cardPhotos.appendChild(newCardPhoto);
      }
    }

    var cardAvatar = newCard.querySelector('.popup__avatar');
    cardAvatar.src = currentOffer.author.avatar;

    return newCard;
  };

  // скрытие карточки

  var hideCard = function () {
    var oldCard = document.querySelector('.map__card');

    if (oldCard) {
      oldCard.remove();
      document.removeEventListener('keydown', onKeydownClose);
    }

    window.pins.deactivatePin();
  };

  var onClickClose = function () {
    hideCard();
  };

  var onKeydownClose = function (evt) {
    if (evt.key === ESC_KEY) {
      hideCard();
    }
  };

  // отрисовка карточки

  var renderCard = function (offerInfo) {
    hideCard();

    var fragment = document.createDocumentFragment();
    var map = document.querySelector('.map');
    var mapFilter = document.querySelector('.map__filters-container');

    fragment.appendChild(createCard(offerInfo));

    map.insertBefore(fragment, mapFilter);

    var cardClose = document.querySelector('.popup__close');

    cardClose.addEventListener('click', onClickClose);
    document.addEventListener('keydown', onKeydownClose);
  };

  // открытие карточки по клику на пин

  var getPins = function (offers) {
    var mapPins = Array.from(document.querySelectorAll('.map__pin'));
    mapPins.shift();

    mapPins.forEach(function (pin, index) {
      pin.addEventListener('click', function () {
        renderCard(offers[index]);
        window.pins.activatePin(pin);
      });

      pin.addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          renderCard(offers[index]);
          window.pins.activatePin(pin);
        }
      });
    });
  };

  window.card = {
    renderCard: renderCard,
    getPins: getPins,
    hideCard: hideCard
  };
})();
