const getTaskData = (id = 0) => {
  const generateRandomBool = () => !Math.round(Math.random());
  const generateRandomDate = () => {
    const random = Math.random();
    const dayMS = 24 * 60 * 60 * 1000;
    const dateAddition = Math.floor(random > 0.5 ? random * 7 : random * -7);

    return Date.now() + Math.floor(dateAddition) * dayMS;
  };

  return {
    id,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`
    ][Math.floor(Math.random() * 5)],
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`
    ][Math.floor(Math.random() * 3)],
    tags: new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
      `wineypooh`,
      `russiansdidit`
    ]),
    dueDate: generateRandomDate(),
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
    isFavorite: generateRandomBool(),
    isDone: generateRandomBool()
  };
};

export default getTaskData;
