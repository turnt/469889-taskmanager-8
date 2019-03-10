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

export {
  setEvents,
  getFirstTrueKey
};
