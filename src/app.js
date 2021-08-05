/* eslint-disable */
import "bootstrap";
import "./style.css";

const INPUT = document.querySelector("#inputOfNumberOfCards");
const BUTTON = document.querySelector("#generatorCardButton");
const BUBBLEBUTTON = document.querySelector("#bubbleButton");
const SELECTIONBUTTON = document.querySelector("#selecctionButton");
const DRAWNCARDSCONTAINER = document.querySelector("#drawnCardsContainer");
const DRAWORDEREDCARDSCONTAINER = document.querySelector(
  "#drawnOrderedCardscontainer"
);
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const SUITS = ["♠", "♣", "♥", "♦"];
const SECTION_TO_DRAW = document.querySelector("#drawnCardsContainer");

let cardList = [];

window.onload = function() {
  getCards();
  sortCardsBubble();
  sortCardsSelection();
};

const getCards = () => {
  BUTTON.addEventListener("click", event => {
    event.preventDefault();
    cardList = [];
    DRAWNCARDSCONTAINER.innerHTML = "";
    DRAWORDEREDCARDSCONTAINER.innerHTML = "";
    let row = document.createElement("div");
    for (let index = 0; index < INPUT.value; index++) {
      let cardTemp = generateCards();
      cardList.push(cardTemp);
      drawCard(cardTemp, DRAWNCARDSCONTAINER, row);
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

const drawCard = (card, place, row) => {
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

  row.classList.add("row");
  row.appendChild(cardBody);
  place.appendChild(row);
};

function drawRowOfCards(myArray, counter) {
  //esta función imprime la fila de cartas que irá pasando el algoritmo en cada proceso
  let row = document.createElement("div");
  row.innerHTML = counter;
  for (let index = 0; index < cardList.length; index++) {
    drawCard(myArray[index], DRAWORDEREDCARDSCONTAINER, row);
  }
}
function sortCardsBubble() {
  BUBBLEBUTTON.addEventListener("click", event => {
    event.preventDefault();
    DRAWORDEREDCARDSCONTAINER.innerHTML = "";
    DRAWORDEREDCARDSCONTAINER.innerHTML =
      "<p>Cartas ordenadas con Bubble Sort: (Para volver a utilizar un algoritmo de ordenación, generar nuevas cartas)</p>";
    bubbleSortAlgorithm(cardList);
  });
}

function sortCardsSelection() {
  SELECTIONBUTTON.addEventListener("click", event => {
    event.preventDefault();
    DRAWORDEREDCARDSCONTAINER.innerHTML = "";
    DRAWORDEREDCARDSCONTAINER.innerHTML =
      "<p>Cartas ordenadas con Selection Sort: (Para volver a utilizar un algoritmo de ordenación, generar nuevas cartas)</p>";
    selectSort(cardList);
  });
}

function bubbleSortAlgorithm(arr) {
  let wall = arr.length - 1;
  let counter = 0;
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      if (arr[index].value > arr[index + 1].value) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
        drawRowOfCards(cardList, counter);
        counter++;
      }

      index++;
    }
    wall--;
  }
  return arr;
}

function selectSort(arr) {
  let min = 0;
  let counter = 0;
  while (min < arr.length) {
    for (let i = min + 1; i < arr.length; i++) {
      if (arr[min].value > arr[i].value) {
        let aux = arr[min];
        arr[min] = arr[i];
        arr[i] = aux;
        drawRowOfCards(cardList, counter);
        counter++;
      }
    }
    min++;
  }
  return arr;
}
