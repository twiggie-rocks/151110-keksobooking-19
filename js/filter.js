'use strict';

(function () {
  // сохраняем данные, полученные с сервера

  var loadSuccessful = function (data) {
    var offers = data;

    // по умолчанию выводим 5 первых объектов из массива

    var maxOffersNumber = 5;
    var defaultOffers = offers.slice(0, maxOffersNumber);
    window.pins.renderPins(defaultOffers);

    // слушаем переключение опций фильтра

    var housingTypeFilter = document.querySelector('#housing-type');

    housingTypeFilter.addEventListener('change', function () {

      var filteredOffers = [];

      // создаем отфильтрованный массив
      if (housingTypeFilter.value === 'any') {
        filteredOffers = defaultOffers;
      } else {
        filteredOffers = offers.filter(function (oneOffer) {
          return oneOffer.offer.type === housingTypeFilter.value;
        });
      }

      // выводим отфильтрованные пины
      window.pins.renderPins(filteredOffers);
    });
  };

  window.filter = {
    loadSuccessful: loadSuccessful,
  };
}());
