export default class Snake {
    constructor() {
      this.alive = true;
      this.body = 
      [
        [10, 10],
        [9, 10],
        [8, 10],
        [7, 10],
        [6, 10],
        [5, 10],
        [4, 10],
      ];
      
      
      this.direction = "D"; //0 stands for up
      this.head = { x: null, y: null };
      this.speed = 50;
    }
  
    updateDirection(dir) {
      this.direction = dir;
    }
  
    eat(food) {
      this.body.unshift(food);
      if ((this.body.length - 7) % 2 === 0) {
        // 30 is the limit
        this.speed >30 && ( this.speed -= 10);  
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