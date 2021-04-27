/* eslint-disable */
import "bootstrap";
import "./style.css";

const INPUT = document.querySelector("#inputOfNumberOfCards");
const BUTTON = document.querySelector("#generatorCard");
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];
const SUITS = ["♠", "♣", "♥", "♦"];
const SECTION_TO_DRAW = document.querySelector("#drawnCardsContainer");

window.onload = function() {
  getCards();
};

const getCards = () => {
  BUTTON.addEventListener("click", event => {
    event.preventDefault();
    for (let index = 0; index < INPUT.value; index++) {
      drawCard(generateCards());
    }
  });
};

const generateCards = () => {
  let card = {
    value: VALUES[getRandom(VALUES.length)],
    suit: SUITS[getRandom(SUITS.length)]
  };
  return card;
};

const getRandom = maxNumber => {
  return Math.floor(Math.random() * maxNumber);
};

const drawCard = card => {
  let cardBody = document.createElement("div");
  cardBody.classList.add("card");

  let firstSuitContainer = document.createElement("div");
  let firstSuit = document.createTextNode(card.suit);
  firstSuitContainer.appendChild(firstSuit);
  firstSuitContainer.classList.add("firstSuit");

  let valueContainer = document.createElement("div");
  let value = document.createTextNode(card.value);
  valueContainer.appendChild(value);
  valueContainer.classList.add("valueContainer");

  let secondSuitContainer = document.createElement("div");
  let secondSuit = document.createTextNode(card.suit);
  secondSuitContainer.appendChild(secondSuit);
  secondSuitContainer.classList.add("secondSuit");

  if (card.suit == "♥" || card.suit == "♦") {
    firstSuitContainer.classList.add("red");
    secondSuitContainer.classList.add("red");
  } else {
    firstSuitContainer.classList.add("black");
    secondSuitContainer.classList.add("black");
  }

  cardBody.appendChild(firstSuitContainer);
  cardBody.appendChild(valueContainer);
  cardBody.appendChild(secondSuitContainer);

  SECTION_TO_DRAW.appendChild(cardBody);
};
