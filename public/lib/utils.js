export const getRandomNumber = (min, max) => {
  const rand = Math.random();
  const range = max - min;
  return min + Math.round(rand * range);
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
