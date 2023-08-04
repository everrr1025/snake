import game from "./lib/game.js";

const initial = (mapSize) => {
  const myGame = new game(mapSize);
  document.addEventListener(`keydown`, (e) => {
    myGame.handleEvent(e.key);
  });
  myGame.launch();
};

initial(30);
