'use strict';

(function () {
  var MAX_OFFERS_NUMBER = 5;
  var TIMEOUT_INTERVAL = 300;

  // в неактивном режиме фильтр заблокирован

  var mapFilter = document.querySelector('.map__filters');
  var filterFields = Array.from(mapFilter.children);

  var disableFilter = function () {
    filterFields.forEach(function (field) {
      field.setAttribute('disabled', 'true');
    });
  };

  disableFilter();

  // сохраняем данные, полученные с сервера

  var loadSuccessful = function (data) {
    window.filter.offers = data;

    // по умолчанию выводим 5 первых объектов из массива

    var defaultOffers = window.filter.offers.slice(0, MAX_OFFERS_NUMBER);
    window.pins.renderPins(defaultOffers);

    // разблокировка фильтра

    filterFields.forEach(function (field) {
      field.removeAttribute('disabled');
    });

    return window.filter.offers;
  };

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

  // итоговая фильтрация и отрисовка пинов

  var updatePins = function () {
    var filteredOffers = [];
    var k = 0;

    for (var i = 0; i < window.filter.offers.length; i++) {

      var offer = window.filter.offers[i];

      if (filterByType(offer) && filterByPrice(offer) && filterByRooms(offer) && filterByGuests(offer) && filterByFeatures(offer)) {
        filteredOffers.push(offer);
        k++;
      }

      if (k === MAX_OFFERS_NUMBER) {
        break;
      }
    }

    window.pins.renderPins(filteredOffers);
    window.card.hideCard();
  };

  // слушаем переключение опций

  var onFilterChange = function () {
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updatePins();
    }, TIMEOUT_INTERVAL);
  };

  mapFilter.addEventListener('change', onFilterChange);

  window.filter = {
    loadSuccessful: loadSuccessful,
  };
}());
