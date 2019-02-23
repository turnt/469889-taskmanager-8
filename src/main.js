import createFilters from './components/create-filters';
import createCards from './components/create-task-cards';
import {setEvents} from './utils/utils';

const dummyFiltersData = [
  {name: `all`, count: 15, checked: true},
  {name: `overdue`, count: 0},
  {name: `today`, count: 0},
  {name: `favorites`, count: 7},
  {name: `repeating`, count: 2},
  {name: `tags`, count: 6},
  {name: `archive`, count: 115},
];
const dummyCardData = {
  id: 0,
  edit: false,
  color: `black`,
  title: `It is example of repeating task. It marks by wave.`,
  tags: [`repeat`, `cinema`, `entertaiment`],
  date: `23 September`,
  time: `11:15 PM`,
  repeat: true,
  repeatDays: [`mo`, `fr`],
  img: `img/sample-img.jpg`
};
const staticAmountOfCards = 7;


const filtersContainer = document.querySelector(`.main__filter`);
filtersContainer.innerHTML = createFilters(dummyFiltersData);

const filtersInputs = document.querySelectorAll(`.filter__input`);
const tasksContainer = document.querySelector(`.board__tasks`);

const toggleFilter = () => {
  const randomAmount = Math.ceil(Math.random() * staticAmountOfCards);
  tasksContainer.innerHTML = createCards(dummyCardData, randomAmount);
};

tasksContainer.innerHTML = createCards(dummyCardData, staticAmountOfCards);
setEvents(filtersInputs, {eventName: `change`, cb: toggleFilter});
