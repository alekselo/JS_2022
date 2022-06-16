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
const checkboxes = document.getElementsByTagName("input");
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
    this.addTitle();
    this.inputRollback();
    startBtn.addEventListener("click", this.check.bind(appData));
    resetBtn.addEventListener("click", this.reset.bind(appData));
    screenBtn.addEventListener("click", this.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
    this.title = title.textContent;
  },
  addScreens: function () {
    // screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;
      this.screens.push({
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
      this.start();
    } else {
      alert("Укажите тип и количество экранов!");
    }
  },
  inputRollback: function () {
    rangeInput.addEventListener("input", () => {
      rangeValue.textContent = rangeInput.value + "%";
      this.rollback = rangeInput.value;
      this.servicePercentPrice = Math.ceil(
        this.fullPrice - this.fullPrice * (this.rollback / 100)
      );
      this.showResult();
    });
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });
    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },
  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.screenCount;
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    cloneScreen.querySelector("input").value = "";
    screens[screens.length - 1].after(cloneScreen);
    screens = document.querySelectorAll(".screen");
  },
  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
    }
    for (let key in this.screens) {
      this.screenCount += this.screens[key].count;
    }
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }
    for (let key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }
    this.fullPrice =
      this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    this.servicePercentPrice = Math.ceil(
      this.fullPrice - this.fullPrice * (this.rollback / 100)
    );
  },
  showBtnReset: function () {
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    screenBtn.setAttribute("disabled", true);
  },
  hiddenBtnReset: function () {
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    screenBtn.removeAttribute("disabled");
  },
  disableCheckbox: function () {
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === "checkbox") {
        checkboxes[i].setAttribute("disabled", true);
      }
    }
  },
  turnOnCheckbox: function () {
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type === "checkbox") {
        checkboxes[i].removeAttribute("disabled");
        checkboxes[i].checked = false;
      }
    }
  },
  disableScreens: function () {
    for (let i = 0; i < screens.length; i++) {
      const select = screens[i].querySelector(".screen select");
      const input = screens[i].querySelector(".screen input");

      select.setAttribute("disabled", true);
      input.setAttribute("disabled", true);
    }
  },
  turnOnScreens: function () {
    const select = document.querySelector(".screen select");
    const input = document.querySelector(".screen input");
    select.value = "";
    input.value = "";
    select.removeAttribute("disabled");
    input.removeAttribute("disabled");
  },
  clearDataScreens: function () {
    for (let i = 0; i < screens.length; i++) {
      const select = screens[i].querySelector(".screen select");
      const input = screens[i].querySelector(".screen input");

      select.value = 0;
      input.value = 0;
    }
  },
  deleteScreenBlock: function () {
    for (let i = 1; i < screens.length; i++) {
      screens[i].remove();
    }
  },
  resetRangeValue: function () {
    rangeInput.value = 0;
    rangeValue.textContent = "0 %";
  },
  resetResult: function () {
    total.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
    totalCount.value = 0;
  },
  resetAppData: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.screenCount = 0;
    this.rollback = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },
  logger: function () {
    console.log("Название проекта : " + this.title);
    console.log("Стоимость вёрстки : " + this.screenPrice);
    console.log("Полная стоимость : " + this.fullPrice);
    for (let key in this) {
      console.log("Ключ : " + key + " Значение : " + this[key]);
    }
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    // this.logger();
    this.showResult();
    this.showBtnReset();
    this.disableCheckbox();
    this.disableScreens();
    console.log(totalCount.value);
    console.log(this.screens);
  },
  reset: function () {
    // this.clearDataScreens();
    this.deleteScreenBlock();
    this.turnOnCheckbox();
    this.turnOnScreens();
    this.hiddenBtnReset();
    this.resetRangeValue();
    this.resetResult();
    this.resetAppData();
    console.log(totalCount.value);
    console.log(this.screens);
  },
};

appData.init();
