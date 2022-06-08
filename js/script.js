"use strict";

const adv = document.querySelector(".adv");
const book = document.querySelectorAll(".book");
const bookTitleLink = document.querySelectorAll("a");
const chapterSecondBook = book[0].querySelectorAll("li");
const chapterFifthBook = book[5].querySelectorAll("li");
const bookContent = document.querySelectorAll("ul");
const newChapter = document.createElement("li");

book[1].after(book[0]);
book[5].after(book[2]);
book[5].before(book[3]);

document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

bookTitleLink[4].textContent = "Книга 3. this и Прототипы Объектов";

adv.remove();

newChapter.textContent = "Глава 8: За пределами ES6";
bookContent[2].append(newChapter);
chapter[25].after(newChapter);

chapterSecondBook[10].before(chapterSecondBook[2]);
chapterSecondBook[3].after(chapterSecondBook[6]);
chapterSecondBook[6].after(chapterSecondBook[8]);
chapterFifthBook[3].before(chapterFifthBook[9]);
chapterFifthBook[6].before(chapterFifthBook[2]);
chapterFifthBook[8].before(chapterFifthBook[5]);
