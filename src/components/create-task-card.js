import {getFirstTrueKey, getRandomItems} from '../utils/utils';

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

const createCardTitleTemplate = (text = ``) => `
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

const createRepeatDays = (repeatingDays = {}, id = 1) => {
  const keys = Object.keys(repeatingDays);

  return keys.map((key) => `
    <input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${key}-${id}"
      name="repeat"
      value="${key}"
      ${repeatingDays[key] ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${key}-${id}">${key}</label>
  `).join(``);
};

const findValueInObject = (obj, value) => {
  const values = Object.values(obj);

  return values.find((objValue) => objValue === value);
};

const createCardDeadlineTemplate = (card = {}, time = ``, date = ``) => {
  const hasRepeatedDays = findValueInObject(card.repeatingDays, true);

  if (card.dueDate) {
    const dateTime = new Date(card.dueDate);
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    const dayPart = hours >= 12 ? `PM` : `AM`;
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString(`en-us`, {month: `long`});

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = `0${minutes}`.slice(-2);

    time = `${hours}:${minutes} ${dayPart}`;
    date = `${day} ${month}`;
  }

  return `
    <div class="card__dates">
      <button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${card.dueDate ? `yes` : `no`}</span>
      </button>

      <fieldset class="card__date-deadline ${!card.dueDate ? `visually-hidden` : ``}">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder="23 September"
            name="date"
            value="${date}"
          />
        </label>
        <label class="card__input-deadline-wrap">
          <input
            class="card__time"
            type="text"
            placeholder="11:15 PM"
            name="time"
            value="${time}"
          />
        </label>
      </fieldset>

      <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${hasRepeatedDays ? `yes` : `no`}</span>
      </button>

      <fieldset class="card__repeat-days" ${!hasRepeatedDays ? `disabled` : ``}>
        <div class="card__repeat-days-inner">
          ${createRepeatDays(card.repeatingDays, card.id)}
        </div>
      </fieldset>
    </div>
  `;
};

const createCardTagsTemplate = (tags = new Set()) => getRandomItems([...tags], 3).map((tag) => `
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

const createCardImgTemplate = (src = `img/add-photo.svg`) => `
  <label class="card__img-wrap">
    <input
      type="file"
      class="card__img-input visually-hidden"
      name="img"
    />
    <img
      src="${src}"
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
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${color === currentColor ? `checked` : ``}
    />
    <label
      for="color-${color}-${id}"
      class="card__color card__color--${color}"
    >${color}</label>
  `).join(``);
};

const createCardTemplate = (card = {}) => {
  const modifiers = [
    card.color,
    getFirstTrueKey(card.repeatingDays) && `repeat`
  ];
  let cardClasses = `card`;

  modifiers.forEach((mod) => {
    if (typeof mod !== `undefined`) {
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
            ${createCardImgTemplate(card.picture)}

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

export default createCardTemplate;
