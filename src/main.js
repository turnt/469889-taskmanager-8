'use strict';

(function () {
  const filtersData = [
    {name: `all`, count: 15, checked: true},
    {name: `overdue`, count: 0},
    {name: `today`, count: 0},
    {name: `favorites`, count: 7},
    {name: `repeating`, count: 2},
    {name: `tags`, count: 6},
    {name: `archive`, count: 115},
  ];
  const filtersContainer = document.querySelector(`.main__filter`);

  const createFilter = ({name, checked, count} = {}) => `
    <input
      type="radio"
      id="filter__${name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${checked ? `checked` : ``}
      ${!count ? `disabled` : ``}
    />
    <label for="filter__${name.toLowerCase()}" class="filter__label">
      ${name.toUpperCase()}${count ? ` <span class="filter__${name}-count">${count}</span>` : ``}
    </label>
  `;

  // const createCard = () => ``;

  const mergeFilters = (node) => createFilter(node);

  const toggleFilter = (e) => {
    // console.log(e.currentTarget);
    return e.currentTarget;
  };

  const buildNodes = (arr = [], cb) => {
    if (typeof cb === `function`) {
      return arr.map(cb).join(``);
    }

    return ``;
  };

  const setEvents = (arr = [], {eventName, cb} = {}) => {
    const setNodesEvent = (node) => {
      if (node) {
        node.addEventListener(eventName, cb);
      }
    };

    if (typeof cb === `function`) {
      return arr.forEach(setNodesEvent);
    }

    return false;
  };

  filtersContainer.innerHTML = buildNodes(filtersData, mergeFilters);
  const filtersInputs = document.querySelectorAll(`.filter__input`);
  setEvents(filtersInputs, {eventName: `change`, cb: toggleFilter});
})();
