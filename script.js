"use strict";

let fullPrice;
let allServicePrices;
let servicePercentPrice;
let title = prompt("Как называется Ваш проект?");

const screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
const screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой еще дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 15;

const getAllServicePrices = function (a, b) {
  return (allServicePrices = a + b);
};
function getFullPrice() {
  return (fullPrice = screenPrice + allServicePrices);
}

function getServicePercentPrice() {
  return (servicePercentPrice = Math.ceil(
    fullPrice - fullPrice * (rollback / 100)
  ));
}

function getTitle() {
  return (title =
    title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase());
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

getAllServicePrices(servicePrice1, servicePrice2);
getFullPrice();
getServicePercentPrice();
getTitle();
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens.toLowerCase());
console.log(getServicePercentPrice());
console.log(getRollbackMessage());
