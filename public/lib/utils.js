/*
 * Filename: /Users/lihongda/Develop/fun/snake/public/lib/utils.js
 * Path: /Users/lihongda/Develop/fun/snake
 * Created Date: Friday, November 15th 2019, 3:36:54 pm
 * Author: 李鸿达
 *
 * Copyright (c) 2019 Your Company
 */
export const getRandomNumber = (min, max) => {
  const rand = Math.random();
  const range = max - min;
  return min + Math.round(rand * range);
};

const BODY = [
  [10, 10],
  [9, 10],
  [8, 10],
  [7, 10],
  [6, 10],
  [5, 10],
  [4, 10],
];

export const generateBody = (head) => {
  return BODY;
};

export const generateFood = () => {
  const foodX = getRandomNumber(0, 19);
  const foodY = getRandomNumber(0, 19);
  BODY.forEach((cell) => {
    if (cell[0] === foodX && cell[1] === foodY) {
      return generateFood();
    }
  });

  return [foodX, foodY];
};
