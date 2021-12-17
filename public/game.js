/**
 * created by Hongda
 */

import { getRandomNumber, generateBody, generateFood } from "./lib/utils.js";

class Snake {
  constructor() {
    this.alive = true;
    this.body = generateBody();
    this.direction = "D"; //0 stands for up
    this.head;
    this.speed = 100;
    this._initial();
  }

  _initial() {}

  updateDirection(dir) {
    this.direction = dir;
  }

  eat(food) {
    this.body.unshift(food);
    if ((this.body.length - 7) % 10 === 0) {
      this.speed = this.speed - 100;
    }
  }

  move(stopGame, food) {
    let headX = this.body[0][0];
    let headY = this.body[0][1];
    let newHead;

    switch (this.direction) {
      case "W":
        newHead = [headX, --headY];
        break;
      case "A":
        newHead = [--headX, headY];
        break;
      case "D":
        newHead = [++headX, headY];
        break;
      case "S":
        newHead = [headX, ++headY];
        break;
    }

    if (
      newHead[0] < 0 ||
      newHead[0] > 49 ||
      newHead[1] < 0 ||
      newHead[1] > 49
    ) {
      this.alive = false;
      stopGame();
      return;
    }

    this.body.forEach(cell => {
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

    this.food = generateFood();
    this.intervalId;
    this.grid = new Array(level);
    for (let i = 0; i < level; i++) {
      this.grid[i] = new Array(level);
    }
    this._initalSnake();
  }

  _initial() {
    this._initalSnake();
  }

  _drawGame() {
    console.log(this.snake.body.length);
    if (this.snake.speed === 200) {
      this.launch();
    }
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
          cell.style.backgroundColor = "white";
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
      this.food = generateFood();
    }
    this._drawSnake();
  }

  _initalSnake() {
    debugger;
    this.snake = new Snake();
  }

  _drawSnake() {
    for (let i = 0; i < this.snake.body.length; i++) {
      const cell = this.snake.body[i];
      const x = this.grid[cell[0]][cell[1]];

      x.style.backgroundColor = "white";
    }
  }

  handleEvent(key) {
    if (["A", "S", "W", "D"].includes(key.toUpperCase())) {
      debugger;
      this.snake.updateDirection(key.toUpperCase());
    }
  }
  launch() {
    // debugger;
    console.log(`in launcher`);
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
      // alert(`GAME OVER`);
    });
  }
}
