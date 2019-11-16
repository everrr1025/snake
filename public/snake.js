import game from "./game.js";

const initial = level => {
  const myGame = new game(level);
  document.addEventListener(`keydown`, e => {
    myGame.handleEvent(e.key);
  });
  myGame.launch();
};

initial(50);
