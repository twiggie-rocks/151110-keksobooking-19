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

  // положение пина по умолчанию

  var setDefautCoordinates = function () {
    pin.style.left = PinCoordinates.X + 'px';
    pin.style.top = PinCoordinates.Y + 'px';
  };

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

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var finalCoorinates = {
        x: pin.offsetLeft - shift.x,
        y: pin.offsetTop - shift.y
      };

      // ограничение площади перемещения пина

      if (finalCoorinates.x >= PinCoordinates.MIN_X - PinCoordinates.WIDTH / 2 && finalCoorinates.x <= PinCoordinates.MAX_X - PinCoordinates.WIDTH / 2) {
        pin.style.left = finalCoorinates.x + 'px';
      }

      if (finalCoorinates.y >= PinCoordinates.MIN_Y - PinCoordinates.ACTIVE_HEIGHT && finalCoorinates.y <= PinCoordinates.MAX_Y - PinCoordinates.ACTIVE_HEIGHT) {
        pin.style.top = finalCoorinates.y + 'px';
      }

      var draggedX = Math.round(finalCoorinates.x + PinCoordinates.ACTIVE_WIDTH / 2);
      var draggedY = Math.round(finalCoorinates.y + PinCoordinates.ACTIVE_HEIGHT);

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
    inactiveX: inactiveX,
    inactiveY: inactiveY,
    activeX: activeX,
    activeY: activeY,
    setAddress: setAddress,
    setDefautCoordinates: setDefautCoordinates
  };
}());
