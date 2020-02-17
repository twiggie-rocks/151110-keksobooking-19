'use strict';

(function () {
  // функции для генерации случайных данных

  var generateRandomNumber = function (min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    return randomNumber;
  };

  var generateRandomString = function (arr) {
    var firstString = 0;
    var lastString = arr.length - 1;
    var randomString = generateRandomNumber(firstString, lastString);

    return arr[randomString];
  };

  var generateRandomArray = function (arr) {
    var arrMin = 1;
    var arrMax = arr.length - 1;
    var randomArrayLength = generateRandomNumber(arrMin, arrMax);
    var randomArray = [];

    for (var i = 0; i < randomArrayLength; i++) {
      randomArray.push(arr[i]);
    }

    return randomArray;
  };

  window.data = {
    generateRandomNumber: generateRandomNumber,
    generateRandomString: generateRandomString,
    generateRandomArray: generateRandomArray,
  };
})();
