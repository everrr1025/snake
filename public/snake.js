/*
 * Filename: /Users/lihongda/Develop/fun/snake/public/snake.js
 * Path: /Users/lihongda/Develop/fun/snake
 * Created Date: Friday, November 15th 2019, 11:04:24 am
 * Author: 李鸿达
 *
 * Copyright (c) 2019 Your Company
 */

import game from "./game.js";

const initial = (level) => {
  const myGame = new game(level);
  document.addEventListener(`keydown`, (e) => {
    myGame.handleEvent(e.key);
  });
  myGame.launch();
};

initial(30);
