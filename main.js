let gameBoard = [
  "0", "1", "2",
  "3", "4", "5",
  "6", "7", "8"
]

let isGameOver = false;
let draw = true;
let gameWinner = '';
let detailsTurn = true; // X Start
const boardCells = document.querySelectorAll('[data-cell]');
const reset_btn = document.getElementById("reset-button");
const alert_ = document.querySelector(".alert");
const cancel = document.getElementById("cancel");
const ok = document.getElementById("ok");
const details = document.getElementById("details");
const x_score_display = document.getElementById("x-score-display");
const o_score_display = document.getElementById("o-score-display");
let x = 0;
let o = 0;
const getX = document.querySelector(".x");
const getO = document.querySelector(".o");
getO.classList.remove("turn");
getX.classList.add("turn");
// Handle clicks on board cells
boardCells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || isGameOver) return;
    // Update cell with the current details's symbol
    if (detailsTurn) {
      getO.classList.add("turn");
      getX.classList.remove("turn");
      x_score_display
      cell.textContent = "X";
      detailsTurn = false;
    } else {
      getX.classList.add("turn");
      getO.classList.remove("turn");
      cell.textContent = "O";
      detailsTurn = true;
    }

    // Update the board array
    gameBoard[index] = cell.textContent;

    // Check for a winner or a draw
    checkGameStatus();
  });
});

// Function to check the game status
function checkGameStatus() {
  if (
    (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2]) ||
    (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5]) ||
    (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8]) ||
    (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6]) ||
    (gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7]) ||
    (gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8]) ||
    (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8]) ||
    (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6])
  ) {
    if (detailsTurn) {
      o++;
      o_score_display.textContent = o;
      gameWinner = "O";
    } else {
      x++;
      x_score_display.textContent = x;
      gameWinner = "X";
    }

    isGameOver = true;
    details.textContent = `Player: ${gameWinner} Is Winner`;
    alert_.style.display = "block";
    return;
  }

  // Check if the board is full (draw)
  if (gameBoard.every((cell) => cell === "X" || cell === "O")) {
    isGameOver = true;
    draw = true;
    build_Alert()
  }

}


reset_btn.addEventListener("click", () => {
  reset();
})

function reset() {
  boardCells.forEach((cell) => cell.textContent = "")
  isGameOver = false;
  gameBoard = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
  ]
  detailsTurn = true;
  gameWinner = '';
  getO.classList.remove("turn");
  getX.classList.add("turn");
}

// Close Alert
ok.addEventListener("click", () => alert_.style.display = "none");
cancel.addEventListener("click", () => alert_.style.display = "none");

function build_Alert() {
  if (draw) {
    alert_.style.display = "block";
    details.textContent = "draw";
  }
}