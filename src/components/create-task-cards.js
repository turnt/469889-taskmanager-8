import createCard from './create-task-card';

const createCardsTemplate = (cardData, amount = 0) => {
  const makeCard = (val, id) => createCard(cardData(id));

  return new Array(amount).fill(``).map(makeCard).join(``);
};

export default createCardsTemplate;
