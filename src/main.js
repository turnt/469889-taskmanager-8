(function () {
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

  const createFilterTemplate = ({name = ``, checked = false, count = 0} = {}) => {
    const attributeName = name.toLowerCase();
    const countTemplate = count > 0 ? `<span class="filter__${attributeName}-count">${count}</span>` : ``;
    const disabledAttribute = count <= 0 ? `disabled` : ``;
    const checkedAttribute = checked ? `checked` : ``;

    return `
      <input
        type="radio"
        id="filter__${attributeName}"
        class="filter__input visually-hidden"
        name="filter"
        ${checkedAttribute}
        ${disabledAttribute}
      />
      <label for="filter__${attributeName}" class="filter__label">
        ${name} ${countTemplate}
      </label>
    `;
  };
  const mergeFilters = (node) => createFilterTemplate(node);
  const buildFiltersTemplate = (arr = [], cb) => {
    if (typeof cb === `function`) {
      return arr.map(cb).join(``);
    }

    return ``;
  };

  const cardMods = [`edit`, `color`, `repeat`];
  const cardControlsTemplate = `
    <div class="card__control">
      <button type="button" class="card__btn card__btn--edit">
        edit
      </button>
      <button type="button" class="card__btn card__btn--archive">
        archive
      </button>
      <button
        type="button"
        class="card__btn card__btn--favorites card__btn--disabled"
      >
        favorites
      </button>
    </div>
  `;
  const colorBarTemplate = `
    <div class="card__color-bar">
      <svg class="card__color-bar-wave" width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
  `;
  const createCardTitleTemplate = (text) => {
    text = text || ``;

    return `
      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >${text}</textarea>
        </label>
      </div>
    `;
  };
  const createRepeatDays = (repeatDays = [], id = 1) => {
    const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

    return days.map((name) => `
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${name}-${id}"
        name="repeat"
        value="${name}"
        ${repeatDays.indexOf(name) !== -1 ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${name}-${id}"
        >${name}</label
      >
    `).join(``);
  };
  const createCardDeadlineTemplate = (card = {}) => {
    return `
      <div class="card__dates">
        <button class="card__date-deadline-toggle" type="button">
          date: <span class="card__date-status">${card.date || card.time ? `yes` : `no`}</span>
        </button>

        <fieldset class="card__date-deadline ${!(card.date || card.time) ? `visually-hidden` : ``}">
          <label class="card__input-deadline-wrap">
            <input
              class="card__date"
              type="text"
              placeholder="23 September"
              name="date"
              value="${card.date || ``}"
            />
          </label>
          <label class="card__input-deadline-wrap">
            <input
              class="card__time"
              type="text"
              placeholder="11:15 PM"
              name="time"
              value="${card.time || ``}"
            />
          </label>
        </fieldset>

        <button class="card__repeat-toggle" type="button">
          repeat:<span class="card__repeat-status">${card.repeat ? `yes` : `no`}</span>
        </button>

        <fieldset class="card__repeat-days" ${!card.repeat ? `disabled` : ``}>
          <div class="card__repeat-days-inner">
            ${createRepeatDays(card.repeatDays, card.id)}
          </div>
        </fieldset>
      </div>
    `;
  };
  const createCardTagsTemplate = (tags = []) => tags.map((tag) => `
    <span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="${tag}"
        class="card__hashtag-hidden-input"
      />
      <button type="button" class="card__hashtag-name">
        #${tag}
      </button>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>
  `).join(``);
  const createCardDetailsTemplate = (card = {}) => `
    <div class="card__details">
      ${createCardDeadlineTemplate(card)}

      <div class="card__hashtag">
        <div class="card__hashtag-list">
          ${createCardTagsTemplate(card.tags)}
        </div>

        <label>
          <input
            type="text"
            class="card__hashtag-input"
            name="hashtag-input"
            placeholder="Type new hashtag here"
          />
        </label>
      </div>
    </div>
  `;
  const createCardImgTemplate = (src) => `
    <label class="card__img-wrap">
      <input
        type="file"
        class="card__img-input visually-hidden"
        name="img"
      />
      <img
        src="${src || `img/add-photo.svg`}"
        alt="task picture"
        class="card__img"
      />
    </label>
  `;
  const createCardColorsTemplate = (currentColor = `black`, id = 0) => {
    const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

    return colors.map((color) => `
      <input
        type="radio"
        id="color-${color}-${id}"
        class="card__color-input card__color-input--black visually-hidden"
        name="color"
        value="${color}"
        ${color === currentColor ? `checked` : ``}
      />
      <label
        for="color-${color}-${id}"
        class="card__color card__color--${color}"
        >${color}</label
      >
    `).join(``);
  };

  const createCardTemplate = (card = {}) => {
    let cardClasses = `card`;

    cardMods.forEach((mod) => {
      if (card[mod]) {
        cardClasses += ` card--${mod}`;
      }
    });

    return `
      <article class="${cardClasses}">
        <form class="card__form" method="get">
          <div class="card__inner">
            ${cardControlsTemplate}
            ${colorBarTemplate}
            ${createCardTitleTemplate(card.title)}

            <div class="card__settings">
              ${createCardDetailsTemplate(card)}
              ${createCardImgTemplate(card.img)}

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${createCardColorsTemplate(card.color, card.id)}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
  };

  const setEvents = (arr = [], {eventName = `click`, cb} = {}) => {
    const setNodeEvent = (node) => {
      node.addEventListener(eventName, cb);
    };

    if (typeof cb === `function`) {
      return arr.forEach(setNodeEvent);
    }

    return false;
  };

  const createCardsTemplate = (cardData = {}, amount = 0) => {
    let cardsTemplate = ``;

    for (let i = 0; i < amount; i++) {
      cardsTemplate += createCardTemplate(cardData);
    }

    return cardsTemplate;
  };

  const filtersContainer = document.querySelector(`.main__filter`);
  filtersContainer.innerHTML = buildFiltersTemplate(dummyFiltersData, mergeFilters);

  const filtersInputs = document.querySelectorAll(`.filter__input`);
  const tasksContainer = document.querySelector(`.board__tasks`);

  const toggleFilter = () => {
    const randomAmount = Math.ceil(Math.random() * staticAmountOfCards);
    tasksContainer.innerHTML = createCardsTemplate(dummyCardData, randomAmount);
  };

  tasksContainer.innerHTML = createCardsTemplate(dummyCardData, staticAmountOfCards);
  setEvents(filtersInputs, {eventName: `change`, cb: toggleFilter});
})();
