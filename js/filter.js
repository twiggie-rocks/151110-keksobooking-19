'use strict';

(function () {
  var MAX_OFFERS_NUMBER = 5;

  // сохраняем данные, полученные с сервера

  var loadSuccessful = function (data) {
    window.filter.offers = data;

    // по умолчанию выводим 5 первых объектов из массива

    var defaultOffers = window.filter.offers.slice(0, MAX_OFFERS_NUMBER);
    window.pins.renderPins(defaultOffers);

    return window.filter.offers;
  };

  var mapFilter = document.querySelector('.map__filters');

  // фильтрация по типу жилья

  var filterByType = function (currentOffer) {
    var housingType = mapFilter.querySelector('#housing-type').value;

    if (housingType === 'any') {
      return currentOffer;
    } else {
      return currentOffer.offer.type === housingType;
    }
  };

  // фильтрация по цене

  var filterByPrice = function (currentOffer) {
    var price = mapFilter.querySelector('#housing-price').value;

    switch (price) {
      case 'low':
        return currentOffer.offer.price < 10000;
      case 'middle':
        return (currentOffer.offer.price >= 10000 && currentOffer.offer.price <= 50000);
      case 'high':
        return currentOffer.offer.price > 50000;
      default:
        return currentOffer;
    }
  };

  // фильтр по числу комнат

  var filterByRooms = function (currentOffer) {
    var roomsNumber = mapFilter.querySelector('#housing-rooms').value;

    if (roomsNumber === 'any') {
      return currentOffer;
    } else {
      return currentOffer.offer.rooms === parseInt(roomsNumber, 10);
    }
  };

  // фильтр по числу гостей

  var filterByGuests = function (currentOffer) {
    var guestsNumber = mapFilter.querySelector('#housing-guests').value;

    if (guestsNumber === 'any') {
      return currentOffer;
    } else {
      return currentOffer.offer.guests === parseInt(guestsNumber, 10);
    }
  };

  // фильтр по наличию удобств

  var filterByFeatures = function (currentOffer) {
    var features = Array.from(mapFilter.querySelectorAll('.map__checkbox'));
    var selectedFeatures = features.filter(function (feature) {
      return feature.checked;
    });

    if (selectedFeatures.length) {
      return selectedFeatures.every(function (feature) {
        return currentOffer.offer.features.includes(feature.value);
      });
    }

    return currentOffer;
  };

  // слушаем переключение опций и создаем отфильтрованный массив

  var onFilterChange = function () {
    var filteredOffers = window.filter.offers
      .filter(filterByType)
      .filter(filterByPrice)
      .filter(filterByRooms)
      .filter(filterByGuests)
      .filter(filterByFeatures)
      .slice(0, MAX_OFFERS_NUMBER);

    // выводим отфильтрованные пины
    window.pins.renderPins(filteredOffers);
    window.card.hideCard();
  };

  mapFilter.addEventListener('change', onFilterChange);

  window.filter = {
    loadSuccessful: loadSuccessful,
  };
}());
