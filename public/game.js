/**
 * created by Hongda
 */

import { getRandomNumber, generateBody, generateFood } from "./lib/utils.js";

class Snake {
  constructor() {
    this.alive = true;
    this.body = generateBody();
    this.direction = "D"; //0 stands for up
    this.head = { x: null, y: null };
    this.speed = 100;
  }

  updateDirection(dir) {
    this.direction = dir;
  }

  eat(food) {
    this.body.unshift(food);
    if ((this.body.length - 7) % 10 === 0) {
      this.speed = this.speed - 100;
    }
  }

  die() {
    this.alive = false;
  }
  move(stopGame) {
    this.head.x = this.body[0][0];
    this.head.y = this.body[0][1];
    let newHead;

    switch (this.direction) {
      case "W":
        newHead = [this.head.x, --this.head.y];
        break;
      case "A":
        newHead = [--this.head.x, this.head.y];
        break;
      case "D":
        newHead = [++this.head.x, this.head.y];
        break;
      case "S":
        newHead = [this.head.x, ++this.head.y];
        break;
    }

    if (
      newHead[0] < 0 ||
      newHead[0] > 29 ||
      newHead[1] < 0 ||
      newHead[1] > 29
    ) {
      this.alive = false;
      stopGame();
      return;
    }

    this.body.forEach((cell) => {
      //head hits the body
      if (cell[0] === newHead[0] && cell[1] === newHead[1]) {
        this.alive = false;
        stopGame();
        return;
      }
    });

    if (this.alive) {
      this.body.pop();
      this.body.unshift(newHead);
    }
  }
  print() {
    console.log(this.body);
  }
}

/**
 * Game
 */
//const x = new Game(level);
export default class Game {
  constructor(level) {
    this.level = level;
    this.score = 0;
    this.food = generateFood();
    this.intervalId;
    this.snake;
    this.grid = new Array(level);
    for (let i = 0; i < level; i++) {
      this.grid[i] = new Array(level);
    }
    this._initalSnake();
  }

  _drawGame() {
    const GAME_SCREEN = document.getElementById(`game-screen`);
    GAME_SCREEN.innerHTML = "";
    const CELL_WIDTH = GAME_SCREEN.offsetWidth / this.level + "px";
    for (let i = 0; i < this.level; i++) {
      let line = document.createElement(`div`);
      line.className = "screen-line";
      line.style.height = CELL_WIDTH;
      GAME_SCREEN.appendChild(line);

      for (let j = 0; j < this.level; j++) {
        let cell = document.createElement(`div`);
        cell.className = `screen-cell`;
        cell.style.width = CELL_WIDTH;
        cell.style.backgroundColor = "red";
        if (this.food[0] === j && this.food[1] === i) {
          cell.style.backgroundColor = "bisque";
        }
        line.appendChild(cell);
        this.grid[j][i] = cell;
      }
    }

    this.snake.move(() => {
      this.stop();
    });
    if (
      this.snake.body[0][0] === this.food[0] &&
      this.snake.body[0][1] === this.food[1]
    ) {
      this.snake.eat(this.food);
      this.score++;
      this.food = generateFood();
    }
    this._drawSnake();
    this._updateScore();
  }

  _initalSnake() {
    this.snake = new Snake();
  }

  _drawSnake() {
    for (let i = 0; i < this.snake.body.length; i++) {
      const cell = this.snake.body[i];
      const x = this.grid[cell[0]][cell[1]];

      x.style.backgroundColor = "white";
    }
  }

  _updateScore() {
    document.getElementById("score").innerText = this.score;
  }

  handleEvent(key) {
    const direction = key.toUpperCase();

    if (["A", "S", "W", "D"].includes(direction)) {
      if (direction == "A" && this.snake.direction == "D") {
        return;
      }
      if (direction == "D" && this.snake.direction == "A") {
        return;
      }
      if (direction == "W" && this.snake.direction == "S") {
        return;
      }
      if (direction == "S" && this.snake.direction == "W") {
        return;
      }
      this.snake.updateDirection(direction);
    }
  }
  launch() {
    if (this.intervalId) {
      this.stop();
    }
    this.intervalId = setInterval(() => {
      this._drawGame();
    }, this.snake.speed);
  }

  stop() {
    clearInterval(this.intervalId);
    setTimeout(() => {
      alert(`GAME OVER`);
    });
  }
}
