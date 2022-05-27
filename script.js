"use strict";

let title = "Название проекта";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 5000;
let rollback = Math.round(Math.random() * 101);
let fullPrice = 30000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов: " + screenPrice + " рублей.");
console.log("Стоимость разработки сайта: " + fullPrice + " рублей.");
screens = screens.toLowerCase().split();
console.log(screens);
console.log(
  "Процент отката посреднику за работу: " +
    fullPrice * (rollback / 100) +
    " рублей."
);
