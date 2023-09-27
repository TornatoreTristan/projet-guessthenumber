// @ts-nocheck
import "./style.css";

// Récupération des éléments du DOM
const uiStart = document.querySelector("#ui-start");
const ui = document.querySelector("#ui");
const score = document.querySelector("#score");
const helper = document.querySelector("#helper");
const response = document.querySelector("#response");

class Game {
  constructor() {
    this.guessNumber = null;
    this.attempt = 0;
  }

  init() {
    const randomNumber = Math.floor(Math.random() * 501);
    this.guessNumber = randomNumber;
    console.log(this.guessNumber);
  }

  counterAttempt() {
    this.attempt += 1;
    return this.attempt;
  }

  check(playerNumber) {
    if (!this.guessNumber) return;
    if (isNaN(playerNumber)) {
      if (!response) return;
      response.classList.remove("hidden");
      response.classList.add("bg-rose-200");
      response.innerText = "Vous n'avez pas rentré un chiffre";
      return console.log("ce n'est pas un nombre");
    }
    if (playerNumber > this.guessNumber) {
      if (!response) return;
      response.classList.add("bg-slate-100");
      response.classList.remove("hidden", "bg-rose-200");
      response.innerText = "C'est plus petit !";
      return;
    } else if (playerNumber < this.guessNumber) {
      if (!response) return;
      response.classList.remove("hidden", "bg-rose-200");
      response.classList.add("bg-slate-100");
      response.innerText = "C'est plus grand !";
      return;
    }
    if (!response) return;
    response.classList.remove("hidden", "bg-rose-200", "bg-slate-100");
    response.classList.add("find");
    response.innerText = `✅ Bravo, tu as trouvé le chiffre en ${
      this.attempt + 1
    } essais, c'était bien ${this.guessNumber}`;
  }

  helper(pixel) {
    const rect = helper.getBoundingClientRect();
    const pourcentage = Math.floor((pixel / rect.width) * 100);
    console.log(pourcentage);

    const marker = document.createElement("div");
    marker.style.position = "absolute";
    marker.style.width = "50px";
    marker.style.textAlign = "center";
    marker.style.heigt = "50px";
    marker.style.top = `10px`;
    // marker.style.left = `${position - 25}px`;
    marker.style.left = `calc(${pourcentage}% - 25px)`;
    marker.innerText = "❌";

    helper.appendChild(marker);
  }
}

class Player {
  constructor() {
    this.playerNumber = null;
  }

  guess(number) {
    this.playerNumber = Number(number);
    game.check(Number(this.playerNumber));
  }
}

const game = new Game();
const player = new Player();

// Fonction démarrage du jeu
const startButton = document.querySelector("#btnStart");
startButton?.addEventListener("click", () => {
  uiStart?.classList.add("hidden");
  ui?.classList.remove("hidden");
  game.init();
});

// Fonction Player Guess
const form = document.querySelector("#guess-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const number = formData.get("user-guess");
  player.guess(number);
  game.helper(number);
  score.innerHTML = game.counterAttempt();
  form.reset();
});
