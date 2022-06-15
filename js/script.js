"use strict";

const title = document.getElementsByTagName("h1")[0];
const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];
const screenBtn = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const rangeInput = document.querySelector(".rollback input[type=range]");
const rangeValue = document.querySelector(".rollback span.range-value");
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");

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
  screenCount: 0,
  adaptive: true,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  rollback: 0,
  init: function () {
    appData.addTitle();
    appData.inputRollback();

    startBtn.addEventListener("click", appData.check);
    screenBtn.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  addScreens: function () {
    // screens = document.querySelectorAll(".screen");
    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },
  check: function () {
    let screenCollection = document.getElementsByClassName("screen");
    let empty = false;
    for (let i = 0; i < screenCollection.length; i++) {
      const select = screenCollection[i].querySelector(".screen select").value;
      const input = screenCollection[i].querySelector(".screen input").value;

      if (select === "" || input === "") {
        empty = true;
      }
    }
    if (!empty) {
      appData.start();
    } else {
      alert("Укажите тип и количество экранов!");
    }
  },
  inputRollback: function () {
    rangeInput.addEventListener("input", function () {
      rangeValue.textContent = rangeInput.value + "%";
      appData.rollback = rangeInput.value;
    });
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screenCount;
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector("input").value = "";
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }
    for (let key in appData.screens) {
      appData.screenCount += appData.screens[key].count;
    }
    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }
    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }
    appData.fullPrice =
      appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;
    appData.servicePercentPrice = Math.ceil(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
  },
  logger: function () {
    console.log("Название проекта : " + appData.title);
    console.log("Стоимость вёрстки : " + appData.screenPrice);
    console.log("Стоимость дополнительных услуг : " + appData.allServicePrices);
    console.log("Полная стоимость : " + appData.fullPrice);
    for (let key in appData) {
      console.log("Ключ : " + key + " Значение : " + appData[key]);
    }
  },
  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    // appData.logger();
    appData.showResult();
    console.log(appData.screens);
  },
};

appData.init();
