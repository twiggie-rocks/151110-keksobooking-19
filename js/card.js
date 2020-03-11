'use strict';

(function () {
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

      for (var n = 1; n < currentOffer.offer.photos.length; n++) {
        var newCardPhoto = cardPhoto.cloneNode(true);
        newCardPhoto.src = currentOffer.offer.photos[n];
        cardPhotos.appendChild(newCardPhoto);
      }
    }

    var cardAvatar = newCard.querySelector('.popup__avatar');
    cardAvatar.src = currentOffer.author.avatar;

    return newCard;
  };

  // если данных для заполнения не хватает, соответствующий блок скрывается

  // отрисовка карточки

  var renderCard = function (offerInfo) {
    var fragment = document.createDocumentFragment();
    var map = document.querySelector('.map');
    var mapFilter = document.querySelector('.map__filters-container');

    fragment.appendChild(createCard(offerInfo[0]));

    map.insertBefore(fragment, mapFilter);
  };

  window.card = {
    renderCard: renderCard,
  };
}());
