"use strict";

const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const percentItems = document.querySelectorAll(".other-items.percent");
const numberItems = document.querySelectorAll(".other-items.number");
const inputRollback = document.querySelector(".rollback input[type=range]");
const valueRollback = document.querySelector(".rollback span.range-value");
const screenPriceInput = document.getElementsByClassName("total-input")[0];
const screenCountInput = document.getElementsByClassName("total-input")[1];
const servicesValueInput = document.getElementsByClassName("total-input")[2];
const fullCountInput = document.getElementsByClassName("total-input")[3];
const rollbackCountInput = document.getElementsByClassName("total-input")[4];
let screenBlock = document.querySelectorAll(".screen");

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
};

const isString = function (str) {
  return isNaN(parseFloat(str));
};

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  rollback: 10,
  asking: function () {
    do {
      appData.title = prompt(
        "Как называется Ваш проект?",
        "  КальКуЛятор ВёРсТКи   "
      );
    } while (!isString(appData.title));

    for (let i = 0; i < 2; i++) {
      let name;
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!isString(name));

      let price = 0;

      do {
        price = prompt("Сколько будет стоить данная работа?", "12000");
      } while (!isNumber(price));
      appData.screens.push({ id: i, name: name, price: +price });
    }
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return sum + item.price;
    }, 0);
    for (let i = 0; i < 2; i++) {
      let name;
      let price;
      do {
        name =
          "№" +
          (i + 1) +
          " " +
          prompt("Какой дополнительный тип услуги нужен?");
      } while (!isString(name));
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!isNumber(price));

      appData.services[name] = +price;
    }
    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  getAllServicePrices: function () {
    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrice: function () {
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  getTitle: function () {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().slice(1).toLowerCase();
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
    console.log(appData.screens);
    console.log(appData.services);
  },
  start: function () {
    appData.asking();
    appData.getAllServicePrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();
    appData.logger();
  },
};

appData.start();
