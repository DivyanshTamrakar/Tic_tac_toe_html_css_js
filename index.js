const cellElements = document.querySelectorAll("[data-cell]");
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winningMessageElement = document.querySelector(".winning-message");
const winningMessage = document.querySelector("[winning-message-text]");
const restart = document.querySelector(".restart");
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();


restart.addEventListener('click',startGame)

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
      cell.removeEventListener('click',handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  winningMessageElement.classList.remove('show');
}

function endGame(draw) {
  if (draw) {
    winningMessage.innerText = "Draw!";
  } else {
    winningMessage.innerText = `${circleTurn ? "0's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}
