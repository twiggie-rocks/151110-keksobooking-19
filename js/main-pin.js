'use strict';

(function () {
  var PinCoordinates = {
    WIDTH: 65,
    HEIGHT: 65,
    X: 570,
    Y: 375,
    ACTIVE_WIDTH: 65,
    ACTIVE_HEIGHT: 84,
    MIN_X: 0,
    MAX_X: document.querySelector('.map__pins').offsetWidth,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var pin = document.querySelector('.map__pin--main');

  var inactiveX = Math.round(PinCoordinates.X + PinCoordinates.WIDTH / 2);
  var inactiveY = Math.round(PinCoordinates.Y + PinCoordinates.HEIGHT / 2);

  var activeX = Math.round(PinCoordinates.X + PinCoordinates.ACTIVE_WIDTH / 2);
  var activeY = Math.round(PinCoordinates.Y + PinCoordinates.ACTIVE_HEIGHT);

  // расчет координат в поле адреса

  var setAddress = function (x, y) {
    var addressField = document.querySelector('#address');
    addressField.value = x + ', ' + y;
  };

  // в неактивном состоянии в поле адреса подставляются координаты центра пина

  setAddress(inactiveX, inactiveY);

  // перемещение пина по карте

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var finalCoords = {
        x: pin.offsetLeft - shift.x,
        y: pin.offsetTop - shift.y
      };

      // ограничение площади перемещения пина

      if (finalCoords.y >= PinCoordinates.MIN_Y - PinCoordinates.ACTIVE_HEIGHT && finalCoords.y <= PinCoordinates.MAX_Y - PinCoordinates.ACTIVE_HEIGHT) {
        pin.style.top = finalCoords.y + 'px';
      }

      if (finalCoords.x >= PinCoordinates.MIN_X - PinCoordinates.WIDTH / 2 && finalCoords.x <= PinCoordinates.MAX_X - PinCoordinates.WIDTH / 2) {
        pin.style.left = finalCoords.x + 'px';
      }

      var draggedX = Math.round(finalCoords.x + PinCoordinates.ACTIVE_WIDTH / 2);
      var draggedY = Math.round(finalCoords.y + PinCoordinates.ACTIVE_HEIGHT);

      setAddress(draggedX, draggedY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = {
    activeX: activeX,
    activeY: activeY,
    setAddress: setAddress
  };
}());
