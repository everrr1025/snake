import { getRandomNumber } from "./utils.js";
import Snake from "./snake.js";


export default class Game {
  constructor(level) {
    this.level = level;
    this.score = 0;
    this.snake = new Snake();
    this.food = this._generateFood();
    this.intervalId=[];
    this.grid = new Array(level);
    for (let i = 0; i < level; i++) {
      this.grid[i] = new Array(level);
    }
   
  
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
  const foodX = getRandomNumber(0, this.level-1);
  const foodY = getRandomNumber(0, this.level-1);
  this.snake.body.forEach((cell) => {
    if (cell[0] === foodX && cell[1] === foodY) {
      return this._generateFood();
    }
  });

  return [foodX, foodY];
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

  if(!this.snake.alive) return;
   this.intervalId.forEach((id)=>{
    clearTimeout(id)
   })
    this._drawGame();
    const id= setTimeout(() => {
    this.launch()
   },this.snake.speed)
   this.intervalId= []
   this.intervalId.push(id)
   console.log(this.intervalId)
  }

  // launch(){
  //   this.intervalId = setInterval(()=>{
  //     this._drawGame();
  //   },this.snake.speed)
  // }

  stop() {
    this.intervalId.forEach((id)=>{
     
      clearTimeout(id)
     })
    
  }
}
