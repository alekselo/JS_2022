"use strict";

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
};

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",
  rollback: 15,
  asking: function () {
    appData.title = prompt(
      "Как называется Ваш проект?",
      "  КальКуЛятор ВёРсТКи   "
    );
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    ).toLocaleLowerCase();
    do {
      appData.screenPrice = prompt(
        "Сколько будет стоить данная работа?",
        "12000"
      );
    } while (!isNumber(appData.screenPrice));
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let res;
      if (i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
      } else if (i === 1) {
        appData.service2 = prompt("Какой еще дополнительный тип услуги нужен?");
      }
      do {
        res = prompt("Сколько это будет стоить?");
      } while (!isNumber(res));
      sum += +res;
    }
    return sum;
  },
  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrice: function () {
    return Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  getTitle: function () {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().slice(1).toLowerCase()
    );
  },
  getRollbackMessage: function () {
    switch (true) {
      case appData.fullPrice >= 30000:
        return "Даем скидку в 10%";
      case appData.fullPrice >= 15000:
        return "Даем скидку в 5%";
      case appData.fullPrice >= 0:
        return "Скидка не предусмотрена";
      default:
        return "Что то пошло не так";
    }
  },
  logger: function () {
    console.log("Название проекта : " + appData.title);
    console.log("Стоимость вёрстки : " + appData.screenPrice);
    console.log("Стоимость дополнительных услуг : " + appData.allServicePrices);
    console.log("Полная стоимость : " + appData.fullPrice);
    console.log(appData.getRollbackMessage());
    for (let key in appData) {
      console.log("Ключ : " + key + " Значение : " + appData[key]);
    }
  },
  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrice();
    appData.title = appData.getTitle();
    appData.logger();
  },
};

appData.start();
