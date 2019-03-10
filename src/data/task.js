const getTaskData = (id = 0) => {
  let hasColor;

  const generateRandomBool = () => !Math.round(Math.random());
  const generateColor = () => {
    if (!hasColor) {
      hasColor = generateRandomBool();
      return hasColor;
    }

    return false;
  };

  return {
    id,
    colors: {
      black: generateColor(),
      blue: generateColor(),
      green: generateColor(),
      pink: generateColor(),
      yellow: generateColor(),
    },
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)],
    tags: new Set([
      `repeat`,
      `cinema`,
      `entertaiment`
    ]),
    dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    repeatingDays: {
      mo: generateRandomBool(),
      tu: generateRandomBool(),
      we: generateRandomBool(),
      th: generateRandomBool(),
      fr: generateRandomBool(),
      sa: generateRandomBool(),
      su: generateRandomBool(),
    },
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
  };
};

export default getTaskData;
