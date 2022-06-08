"use strict";

const adv = document.querySelector(".adv");
const books = document.querySelector(".books");
const book = document.querySelectorAll(".book");
const body = document.querySelector("body");
const bookTitleLink = document.querySelectorAll("a");
const chapter = document.querySelectorAll("li");
const bookContent = document.querySelectorAll("ul");
const newChapter = document.createElement("li");

book[1].after(book[0]);
book[5].after(book[2]);
book[5].before(book[3]);

body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

bookTitleLink[4].textContent = "Книга 3. this и Прототипы Объектов";

adv.remove();
chapter[10].before(chapter[2]);
chapter[3].after(chapter[6]);
chapter[6].after(chapter[8]);
chapter[49].before(chapter[55]);
chapter[52].before(chapter[48]);
chapter[54].before(chapter[51]);

newChapter.textContent = "Глава 8: За пределами ES6";
bookContent[2].append(newChapter);
chapter[25].after(newChapter);
