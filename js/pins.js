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

  // отрисовка пинов

  var renderPins = function (similarOffers) {
    var fragment = document.createDocumentFragment();
    var mapPins = document.querySelector('.map__pins');
    var oldPins = mapPins.querySelectorAll('.map__pin');

    // удаляем предыдущие пины перед отрисовкой новых

    for (var n = 1; n < oldPins.length; n++) {
      oldPins[n].remove();
    }

    for (var i = 0; i < similarOffers.length; i++) {
      fragment.appendChild(createPin(similarOffers[i]));
    }

    mapPins.appendChild(fragment);
  };

  window.pins = {
    renderPins: renderPins,
  };
})();
