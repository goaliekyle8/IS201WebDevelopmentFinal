const WORDS = ["apple", "grape", "chair", "tiger", "plane", "eagle", "spoon", "blush", "proud"];
const answer = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();

let currentRow = 0;
const maxRows = 6;

const gameContainer = document.getElementById("game");
const guessInput = document.getElementById("guessInput");
const submitButton = document.getElementById("submitGuess");
const message = document.getElementById("message");

// Build the empty board
for (let i = 0; i < maxRows; i++) {
  const row = document.createElement("div");
  row.className = "row";
  for (let j = 0; j < 5; j++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }
  gameContainer.appendChild(row);
}

// Submit guess
submitButton.addEventListener("click", handleGuess);
guessInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleGuess();
});

function handleGuess() {
  const guess = guessInput.value.toUpperCase();

  if (guess.length !== 5) {
    showMessage("Please enter a 5-letter word.");
    return;
  }

  if (currentRow >= maxRows) return;

  const row = gameContainer.children[currentRow];
  const tiles = row.children;

  const answerLetters = answer.split("");
  const guessLetters = guess.split("");
  const result = Array(5).fill("absent");

  // First pass: correct letters in correct place
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i] = "correct";
      answerLetters[i] = null;
    }
  }

  // Second pass: correct letters in wrong place
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const index = answerLetters.indexOf(guessLetters[i]);
    if (index !== -1) {
      result[i] = "present";
      answerLetters[index] = null;
    }
  }

  // Apply results to tiles
  for (let i = 0; i < 5; i++) {
    tiles[i].textContent = guessLetters[i];
    tiles[i].classList.add(result[i]);
  }

  if (guess === answer) {
    showMessage("🎉 You got it!");
    endGame();
    return;
  }

  currentRow++;
  guessInput.value = "";

  if (currentRow === maxRows) {
    showMessage(`Game Over! The word was ${answer}.`);
    endGame();
  }
}

function showMessage(text) {
  message.textContent = text;
}

function endGame() {
  guessInput.disabled = true;
  submitButton.disabled = true;
}
