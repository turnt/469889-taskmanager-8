const setEvents = (arr = [], {eventName = `click`, cb} = {}) => {
  const setNodeEvent = (node) => {
    node.addEventListener(eventName, cb);
  };

  if (typeof cb === `function`) {
    return arr.forEach(setNodeEvent);
  }

  return false;
};

export {setEvents};
