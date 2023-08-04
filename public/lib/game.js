import { getRandomNumber } from "./utils.js";
import Snake from "./snake.js";

export default class Game {
  constructor(mapSize) {
    this.mapSize = mapSize;
    this.level = 1;
    this.score = 0;
    this.snake = new Snake();
    this.food = this._generateFood();
    this.intervalId = [];
    this.grid = new Array(mapSize);
    for (let i = 0; i < mapSize; i++) {
      this.grid[i] = new Array(mapSize);
    }
  }

  _drawGame() {
    const GAME_SCREEN = document.getElementById(`map`);
    GAME_SCREEN.innerHTML = "";
    const CELL_WIDTH = GAME_SCREEN.offsetWidth / this.mapSize + "px";
    //const CELL_WIDTH = '25px';
    for (let i = 0; i < this.mapSize; i++) {
      let line = document.createElement(`div`);
      line.className = "screen-line";
      line.style.height = CELL_WIDTH;
      GAME_SCREEN.appendChild(line);

      for (let j = 0; j < this.mapSize; j++) {
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
      this.food = this._generateFood();
    }
    this._drawSnake();
    this._updateScore();
  }

  _drawSnake() {
    for (let i = 0; i < this.snake.body.length; i++) {
      const cell = this.snake.body[i];
      const x = this.grid[cell[0]][cell[1]];

      x.style.backgroundColor = "white";
    }
  }

  _generateFood() {
    let shouldRedo = true;
    let foodX, foodY;
    while (shouldRedo) {
      foodX = getRandomNumber(0, this.mapSize - 1);
      foodY = getRandomNumber(0, this.mapSize - 1);
      shouldRedo = false;
      this.snake.body.forEach((cell) => {
        if (cell[0] === foodX && cell[1] === foodY) {
          shouldRedo = true;
        }
      });
    }

    return [foodX, foodY];
  }
  _updateScore() {
    this.level = (200 - this.snake.speed) / 10 + 1;
    document.getElementById(
      "score"
    ).innerText = `Score:${this.score} - Level:${this.level}`;
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
    if (!this.snake.alive) return;
    this.intervalId.forEach((id) => {
      clearTimeout(id);
    });
    this._drawGame();
    const id = setTimeout(() => {
      this.launch();
    }, this.snake.speed);
    this.intervalId = [];
    this.intervalId.push(id);
  }

  stop() {
    this.intervalId.forEach((id) => {
      clearTimeout(id);
    });
  }
}
