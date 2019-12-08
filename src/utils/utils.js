const setEvents = (arr = [], {eventName = `click`, cb} = {}) => {
  const setNodeEvent = (node) => {
    node.addEventListener(eventName, cb);
  };

  if (typeof cb === `function`) {
    return arr.forEach(setNodeEvent);
  }

  return false;
};

const getFirstTrueKey = (obj = {}) => {
  const keys = Object.keys(obj);

  return keys.filter((key) => obj[key] === true)[0];
};

const getRandomItems = (arr = [], count = 0) => {
  const result = new Set();
  const length = arr.length;

  while (count > 0) {
    const randomIndex = Math.floor(Math.random() * length);

    result.add(arr[randomIndex]);

    if (result.size !== 0) {
      count--;
    }

    if (result.size >= length) {
      break;
    }
  }

  return [...result];
}

export {
  setEvents,
  getFirstTrueKey,
  getRandomItems
};
