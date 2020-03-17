'use strict';

(function () {
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

  // удаление ранее выведенных пинов

  var removePins = function () {
    var oldPins = document.querySelectorAll('.map__pin');

    for (var i = 1; i < oldPins.length; i++) {
      oldPins[i].remove();
    }
  };

  // отрисовка пинов

  var renderPins = function (similarOffers) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');

    removePins();

    similarOffers.forEach(function (oneOffer) {
      if (oneOffer.offer) {
        fragment.appendChild(createPin(oneOffer));
      }
    });

    mapPins.appendChild(fragment);

    // сохраняем пины в массив для дальнейшего использования
    window.card.getPins(similarOffers);
  };

  // деактивация пина

  var deactivatePin = function () {
    if (document.querySelector('.map__pin--active')) {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  // активация выбранного пина

  var activatePin = function (activePin) {
    deactivatePin();
    activePin.classList.add('map__pin--active');
  };

  window.pins = {
    removePins: removePins,
    renderPins: renderPins,
    activatePin: activatePin,
    deactivatePin: deactivatePin
  };
})();
