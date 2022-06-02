"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const rollback = 15;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {
  title = prompt("Как называется Ваш проект?", "  КальКуЛятор ВёРсТКи   ");
  screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
  );
  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
  } while (!isNumber(screenPrice));
  adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getAllServicePrices = function () {
  let sum;
  let sum1;
  let sum2;
  for (let i = 0; i < 2; i++) {
    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?");
      do {
        sum1 = +prompt("Сколько это будет стоить?");
      } while (!isNumber(sum1));
    } else if (i === 1) {
      service2 = prompt("Какой еще дополнительный тип услуги нужен?");
      do {
        sum2 = +prompt("Сколько это будет стоить?");
      } while (!isNumber(sum2));
    }
  }
  return (sum = sum1 + sum2);
};
function getFullPrice() {
  return screenPrice + allServicePrices;
}

function getServicePercentPrice() {
  return Math.ceil(fullPrice - fullPrice * (rollback / 100));
}

function getTitle() {
  return title.trim()[0].toUpperCase() + title.trim().slice(1).toLowerCase();
}

const getRollbackMessage = function () {
  switch (true) {
    case fullPrice >= 30000:
      return "Даем скидку в 10%";
    case fullPrice >= 15000:
      return "Даем скидку в 5%";
    case fullPrice >= 0:
      return "Скидка не предусмотрена";
    default:
      return "Что то пошло не так";
  }
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrice();
title = getTitle();
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase());
console.log(getServicePercentPrice());
console.log(getRollbackMessage());
