import createFilters from './components/create-filters';
import createCards from './components/create-task-cards';
import filtersDummyData from './data/filters';
import taskDummyData from './data/task';
import {setEvents} from './utils/utils';

const staticAmountOfCards = 7;

const filtersContainer = document.querySelector(`.main__filter`);
filtersContainer.innerHTML = createFilters(filtersDummyData);

const filtersInputs = document.querySelectorAll(`.filter__input`);
const tasksContainer = document.querySelector(`.board__tasks`);

const toggleFilter = () => {
  const randomAmount = Math.ceil(Math.random() * staticAmountOfCards);

  tasksContainer.innerHTML = createCards(taskDummyData, randomAmount);
};

tasksContainer.innerHTML = createCards(taskDummyData, staticAmountOfCards);
setEvents(filtersInputs, {eventName: `change`, cb: toggleFilter});
