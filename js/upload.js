'use strict';

(function () {
  // отправка данных на сервер

  var URL = 'https://js.dump.academy/keksobooking';
  var ESC_KEY = 'Escape';
  var SUCCESS_CODE = 200;

  var sendData = function (data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        success();
      } else {
        error();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  // отрисовка сообщения

  var displayMessage = function (template, selector) {
    var messageTemplate = document.querySelector(template).content;
    var newMessageTemplate = messageTemplate.querySelector(selector);

    var newMessage = newMessageTemplate.cloneNode(true);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(newMessage);
    document.querySelector('main').appendChild(fragment);

    // скрытие сообщения

    var hideMessage = function () {
      document.querySelector(selector).remove();
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeydown);
    };

    var onClick = function (evt) {
      evt.preventDefault();
      hideMessage();
    };

    var onKeydown = function (evt) {
      evt.preventDefault();

      if (evt.key === ESC_KEY) {
        hideMessage();
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeydown);
  };

  // если сообщение отправлено

  var onSuccess = function () {
    displayMessage('#success', '.success');
    window.activation.deactivateWindow();
  };

  // если произошла ошибка

  var onError = function () {
    displayMessage('#error', '.error');
  };

  window.upload = {
    sendData: sendData,
    onSuccess: onSuccess,
    onError: onError
  };
}());
